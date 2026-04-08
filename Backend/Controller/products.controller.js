import { Product_data } from "../Model/products.model.js";
import { productRoutes } from "../Routes/products.routes.js";

export async function categorywiseProduct(req,res)
{
    try{
        
        let products;
        if(req.params.category=="All")
        {
            
            products=await Product_data.find({});
        }
        else{
        products=await Product_data.find({productCategory:req.params.category});
        }
        if(products)
        {
            return res.status(200).json({"message":"Products fetched","products":products});
        }
        else{
            return res.status(404).json({"error":"Products not found"});
        }
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function singleProduct(req,res)
{
    try{
        const product=await Product_data.findOne({_id:req.params.productId});
        return res.status(200).json({"message":"Single product fetched successfully","product":product});
    }
    catch(error)
    {
        return res.status(500).json({"error":error})
    }
}

export async function addProduct(req,res)
{
    try{
        const newProduct={
            productName:req.body.productName,
            productQuantity:req.body.productQuantity,
            productPrice:req.body.productPrice,
            productImage:req.body.productImage,
            productCategory:req.body.productCategory,
            productDescription:req.body.productDescription
        }
        const productAdded=new Product_data(newProduct);
        await productAdded.save();
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function updateProduct(req,res)
{
    try{
        const findProduct=Product_data.findOne({_id:req.params.productId});
        findProduct.productName=req.body.productName;
        findProduct.productQuantity=req.body.productQuantity;
        findProduct.productPrice=req.body.productPrice;
        findProduct.productImage=req.body.productImage;
        findProduct.productCategory=req.body.productCategory;
        await findProduct.save();
        return res.status(200).json({"message":"Product updated successfully"});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function deleteProduct(req,res)
{
    try{
        const deletedProduct=await Product_data.deleteOne({"_id":req.params.productId});
        return res.status(200).json({"message":"product deleted successfully"})
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }

}

export async function getAllProducts(req,res){
    try{
        const products=await Product_data.find();
        if(products)
        {
            return res.status(200).json({"message":"products fetched successfully","products":products});
        }
        else{
            return res.status(404).json({"error":"products fetching failed"});
        }
    }
    catch(error)
    {
        console.log(error);
    }
}