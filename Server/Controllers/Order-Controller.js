const Order_Service = require('../Services/Order-Service');



const createOrder = async (req, res) => {

    const user = await req.user;

    try {

        const createdOrder = await Order_Service.createOrder(user, req.body);
        res.status(201).send(createdOrder);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}


const findOrderById = async (req, res) => {

    const user = await req.user;

    try {

        const createdOrder = await Order_Service.findOrderById(req.params.id);

        res.status(201).send(createdOrder);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

}



const orderHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order_Service.userOrderHistory(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const user = req.user;

        const orders = await Order_Service.getAllOrders(user._id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await Order_Service.deleteOrderById(orderId);
        res.status(200).json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, findOrderById, orderHistory,getAllOrders,deleteOrderById};