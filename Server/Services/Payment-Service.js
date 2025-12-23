const razorpay = require("../Config/PAYMENT.js");
const Order_Service = require("../Services/Order-Service.js");

const createPaymentLink = async (orderId) => {

    try {

        const order = await Order_Service.findOrderById(orderId);
        const paymentLinkRequest = {
            amount: order.totalDiscountPrice * 100,
            currency: "INR",
            customer: {
                name: order.user.firstName + "" + order.user.lastName,
                contact: order.user.mobile,
                email: order.user.email
            },
            notify: {
                sms: true,
                email: true

            },
            reminder_enable: true,
            callback_url: `http://localhost:5173/payments/${orderId}`,
            callback_method: 'get'

        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }
        return resData;


    } catch (error) {

        throw new Error(error.message)

    }

}

const updatePaymentInformation = async (reqData) => {

    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;
    try {
        const order = await Order_Service.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if (payment.status == "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.status = "COMPLETED";
            order.orderStatus = "PLACED";
            await order.save()
        }

        const resData = { message: "Your Order Is Placed", success: true }
        return resData;
    } catch (error) {
        throw new Error(error.message)

    }
}


module.exports = {
    createPaymentLink,
    updatePaymentInformation
}