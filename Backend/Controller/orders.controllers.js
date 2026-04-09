import { Order_data } from "../Model/orders.model.js";

export async function getOrders(req,res)
{
    try{
        if(req.params.filter=="All")
        {
            const orders=await Order_data.find();
            return res.status(200).json({"message":"All Orders found","orders":orders});
        }
        else{
            const orders=await Order_data.find({orderStatus:req.params.filter});
            return res.status(200).json({"message":"orders found","orders":orders});
        }

    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function placeOrder(req,res){
    try{
        const newOrder={
            userId:req.body.userId,
            orderStatus:"Pending",
            orderItems:req.body.orderItems,
            orderItemPrice:req.body.orderItemPrice,
            orderItemQuantity:req.body.orderItemQuantity,
            orderTotalPrice:req.body.orderTotalPrice
        }
        await new Order_data(newOrder).save();
        res.status(200).json({"message":"Order placed successfully"});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
}

export async function changeOrderStatus(req,res)
{
    try{
        const order = await Order_data.findOne({_id:req.params.orderId});
        if (!order) {
            return res.status(404).json({"error": "Order not found"});
        }
        order.orderStatus = req.body.orderStatus;
        await order.save();
        return res.status(200).json({"message":"Order status updated"});
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({"error":error});
    }
}

export async function pastOrders(req,res) {
    try{
        const orders=await Order_data.find({userId:req.params.userId});
        return res.status(200).json({"message":"past orders fetched","orders":orders});
    }
    catch(error)
    {
        return res.status(500).json({"error":error});
    }
    
}