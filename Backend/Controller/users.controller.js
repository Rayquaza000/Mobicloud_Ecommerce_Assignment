import bcrypt from "bcrypt";
import { User_data } from "../Model/users.model.js";
import jwt from "jsonwebtoken";
import { Product_data } from "../Model/products.model.js";

export async function signup(req,res)
{
    try{
        const hashedPassword=bcrypt.hashSync(req.body.password,10);
        const newUser={
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            userPassword:hashedPassword,
            userCart:{
                itemIdArray:[],
                itemsArray:[],
                priceOfOneUnitArray:[],
                quantityArray:[]
            }
        }
        const user=new User_data(newUser);
        await user.save();
        return res.status(200).json({"message":"User created successfully","userId":user._id,"userName":user.userName,"userEmail":user.userEmail,"userCart":user.userCart});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function login(req,res)
{
    try{
        const token=jwt.sign({"userId":req.userData.id},process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.cookie("user","authenticated", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({"message":"Login successful","userId":req.userData.id,"userName":req.userData.userName,"userEmail":req.userData.userEmail,"userCart":req.userData.userCart});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function displayCart(req,res)
{
    try{
        const userData=await User_data.findOne({"_id":req.body.userId});
        const userCart=userData.userCart;
        return res.status(200).json({"message":"cart data received","userCart":userCart})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function updateCart(req,res)
{
    try{
        const userData=await User_data.findOne({_id:req.body.userId});
        if(userData)
        {
            const index=userData.userCart.itemsIdArray.indexOf(req.body.itemId);
            userData.userCart.itemsIdArray.slice(index,1);
            userData.userCart.itemsArray.slice(index,1);
            userData.userCart.priceOfOneUnitArray.slice(index,1);
            userData.userCart.quantityArray.slice(index,1);
            await userData.save();
            return res.status(200).json({"message":"Cart updated successfully"});
        }
        else{
            return res.status(500).json({"error":"user with id "+req.body.id+" could not be found"});
        }
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({"error":error});
    }
}

export function logout(req,res)
{
    try{
        res.clearCookie("token")
        return res.status(200).json({"message":"User loggedout"})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function addToCart(req,res)
{
    try{
        const productDetails=await Product_data.findOne({_id:req.body.itemId});
        const userDetails= await User_data.findOne({_id:req.params.userid});
        const index=userDetails.userCart.itemIdArray.indexOf(req.body.itemId);
        if(userDetails.userCart.itemIdArray.includes(req.body.itemId))
        {
            if(req.body.update=="add" && productDetails.productQuantity>=1)
            {
                userDetails.userCart.quantityArray[index]+=1;
                productDetails.productQuantity-=1;
                await userDetails.save();
                await productDetails.save();
                return res.status(200).json({"message":"Item quantity updated"});
            }
            else if(req.body.update=="subtract" && userDetails.userCart.quantityArray[index]>0){
                userDetails.userCart.quantityArray[index]-=1;
                productDetails.productQuantity+=1;
                await userDetails.save();
                await productDetails.save();
                return res.status(200).json({"message":"Item quantity updated"});
            }
            else{
                return res.status(404).json({"error":"Item out of stock or invalid operation"});
            }
        }
        else{
            if(productDetails.productQuantity>=1)
            {
                productDetails.productQuantity-=1;
                userDetails.userCart.itemIdArray.push(req.body.itemId);
                userDetails.userCart.itemsArray.push(productDetails.productName);
                userDetails.userCart.priceOfOneUnitArray.push(productDetails.productPrice);
                userDetails.userCart.quantityArray.push(1);
                await productDetails.save();
                await userDetails.save();
                return res.status(200).json({"message":"Item added to cart"})
            }
            else{
                return res.status(404).json({"error":"Item out of stock"});
            }
        }
        
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}