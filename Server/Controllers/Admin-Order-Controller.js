const Order_Service = require('../Services/Order-Service');





const getAllAdminOrders = async (req,res) =>{
    try {
        const orders = await Order_Service.getAllOrdersAdmin();

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}


const confirmedOrders = async (req,res) =>{

    const orderId = req.params.orderId;

    try {
        const orders = await Order_Service.confirmedOrder(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}


const shippOrders = async (req,res) =>{

    const orderId = req.params.orderId;
    
    try {
        const orders = await Order_Service.shippOrder(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}


const deliverOrders = async (req,res) =>{

    const orderId = req.params.orderId;
    
    try {
        const orders = await Order_Service.deliverOrder(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}


const cancelOrders = async (req,res) =>{

    const orderId = req.params.orderId;
    
    try {
        const orders = await Order_Service.cancelOrder(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}


const deleteOrders = async (req,res) =>{

    const orderId = req.params.orderId;
    
    try {
        const orders = await Order_Service.deleteOrderById(orderId);

        return res.status(200).send(orders);
        
    } catch (error) {
         return  res.status(500).send({error:error.message});
    }
}



module.exports = {getAllAdminOrders, confirmedOrders,shippOrders,deliverOrders,cancelOrders,deleteOrders}