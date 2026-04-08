import brcypt from "bcrypt";
import { User_data } from "../Model/users.model.js";
import jwt from "jsonwebtoken";
import { Product_data } from "../Model/products.model.js";

export async function signup(req,res)
{
    try{
        const encryptedPassword=brcypt.hashSync(req.body.password,10);
        let newUser={
            userName:req.body.userName,
            userEmail:req.body.userEmail,
            userPassword:encryptedPassword,
            userCart:{
                itemIdArray:[],
                itemsArray:[],
                priceOfOneUnitArray:[],
                quantityArray:[]
            }
        }
        await User_data.insertOne(newUser);
        return res.json(201).json({"message":"New User Created"});
    }
    catch(error)
    {
        res.status(500).json({"error":error});
    }
}

export async function login(req,res)
{
    try{
        const token=jwt.sign({"userEmail":req.body.email},process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,       
            sameSite: "None"    
        });
        return res.status(200).json({"message":"Login successfull","userID":existingUser._id,"userName":existingUser.userName,"userEmail":existingUser.userEmail,"userCart":existingUser.userCart});
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
        const userData=await User_data.findOne({_id:req.body.id});
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
        const index=userDetails.userCart.itemsIdArray.indexOf(req.body.itemId);
        if(userDetails.userCart.itemsIdArray.includes(req.body.itemId))
        {
            if(req.body.update=="add" && productDetails.productQuantity>=1)
            {
                userDetails.userCart.quantityArray[index]+=1;
                productDetails.productQuantity-=1;
                userDetails.save();
                productDetails.save();
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
                return res.status(404).json({"error":"Item out of stock"});
            }
        }
        else{
            if(productDetails.productQuantity>1)
            {
                productDetails.productQuantity-=1;
                userDetails.userCart.itemIdArray.push(req.body.itemId);
                userDetails.userCart.itemsArray.push(req.body.itemName);
                userDetails.userCart.priceOfOneUnitArray.push(req.body.itemPrice);
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