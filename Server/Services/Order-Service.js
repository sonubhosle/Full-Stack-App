const Address = require('../Models/Address');
const Order = require('../Models/Order');
const Cart_Service = require('../Services/Cart-Services')
const Order_Item = require('../Models/Order_Items')
const {sendEmail} = require('../Config/email')
const {orderEmailTemplate} = require('../Utils/emailTemplates')

const createOrder = async (user, shippingAddress) => {
  let address;

  if (shippingAddress._id) {
    address = await Address.findById(shippingAddress._id);
  } else {
    address = new Address(shippingAddress);
    address.user = user;
    await address.save();
    user.address = user.address || [];
    user.address.push(address);
    await user.save();
  }

  const cart = await Cart_Service.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new Order_Item({
      price: item.price,
      discountedPrice: item.discountedPrice,
      discountPercent: item.discountPercent,
      product: item.product,
      variant: item.variant || null,
      color: item.color || null,
      size: item.size || null,
      image: item.image || item.product?.images?.[0] || null,
      title: item.title || item.product?.title || 'No title',
      quantity: item.quantity,
      userId: item.userId,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const totalDiscount = cart.totalPrice - cart.totalDiscountPrice;

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountPrice: cart.totalDiscountPrice,
    discount: totalDiscount,
    totalItem: cart.totalItem,
    shippingAddress: address,
  });

  const savedOrder = await createdOrder.save();

  // 📨 Send confirmation email
  const orderList = orderItems.map(
    (i) =>
      `<li>${i.title} - ₹${i.discountedPrice.toLocaleString()} × ${i.quantity}</li>`
  ).join('');

  const html = `
    <div style="font-family:sans-serif;line-height:1.6;color:#333;">
      <h2 style="color:#10b981;">🎉 Order Confirmed</h2>
      <p>Hi ${user.name || "Customer"},</p>
      <p>Your order <b>#${savedOrder._id}</b> has been successfully placed.</p>
      <ul>${orderList}</ul>
      <p><b>Total:</b> ₹${savedOrder.totalDiscountPrice.toLocaleString()}</p>
      <p>You can track your order here:</p>
      <a href="${process.env.FRONTEND_URL}/orders/${savedOrder._id}" style="display:inline-block;padding:10px 14px;background:#10b981;color:white;border-radius:6px;text-decoration:none;">View Order</a>
      <p style="margin-top:20px;">Thank you for shopping with <b>Shoply</b>!</p>
    </div>
  `;

  try {
    await sendEmail(user.email, "Your Shoply Order Confirmation", html);
  } catch (error) {
    console.error("Failed to send confirmation email:", error.message);
  }

  return savedOrder;
};


const placeOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";
  await order.save();

  const html = orderEmailTemplate(
    order,
    "Order Placed Successfully 🎉",
    "Your order has been placed successfully. We’ll notify you once it’s confirmed."
  );

  await sendEmail(order.user.email, "Your Order Has Been Placed 🎉", html);
  return order;
};

const confirmedOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";
  await order.save();

  const html = orderEmailTemplate(
    order,
    "Order Confirmed ✅",
    "Your order has been confirmed and is being prepared for shipment."
  );

  await sendEmail(order.user.email, "Order Confirmed ✅", html);
  return order;
};


const shippOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";
  await order.save();

  const html = orderEmailTemplate(
    order,
    "Order Shipped 🚚",
    "Your order is on its way! You can track its progress from your order details page."
  );

  await sendEmail(order.user.email, "Order Shipped 🚚", html);
  return order;
};


const deliverOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";
  await order.save();

  const html = orderEmailTemplate(
    order,
    "Order Delivered 📦",
    "Your order has been successfully delivered! We hope you enjoy your purchase."
  );

  await sendEmail(order.user.email, "Order Delivered 📦", html);
  return order;
};

const cancelOrder = async (orderId) => {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";
  await order.save();

  const html = orderEmailTemplate(
    order,
    "Order Cancelled ❌",
    "Your order has been cancelled. If you didn’t request this, please contact our support."
  );

  await sendEmail(order.user.email, "Order Cancelled ❌", html);
  return order;
};



const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress");

    return order;
}

const userOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    select: 'title images price discountedPrice'
                }
            })
            .populate('shippingAddress')
            .sort({ createdAt: -1 })
            .lean();

        // Ensure title, image, and discountPercent exist for frontend
        for (const order of orders) {
            for (const item of order.orderItems) {
                item.title = item.title || item.product?.title || 'No title';
                item.image = item.image || item.product?.images?.[0] || '';
                item.discountPercent = item.discountPercent || 
                    (item.price 
                        ? Math.round(((item.price - item.discountedPrice) / item.price) * 100) 
                        : 0);
            }
        }

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllOrders = async (userId) => {
    return await Order.find({user:userId})
        .populate({ path: "orderItems", populate: { path: "product" } })
        .lean();
};

const deleteOrderById = async (orderId) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new Error('Order not found');
        }
        return deletedOrder;
    } catch (error) {
        throw new Error(error.message);
    }
};


const getAllOrdersAdmin = async () => {
    try {
        const orders = await Order.find()
            .populate("user") // get user info
            .populate({ path: "orderItems", populate: { path: "product" } }) // populate products
            .populate("shippingAddress")
            .sort({ createdAt: -1 }) // latest orders first
            .lean();

        // Ensure title, image, and discountPercent exist for frontend
        for (const order of orders) {
            for (const item of order.orderItems) {
                item.title = item.title || item.product?.title || 'No title';
                item.image = item.image || item.product?.images?.[0] || '';
                item.discountPercent = item.discountPercent || 
                    (item.price 
                        ? Math.round(((item.price - item.discountedPrice) / item.price) * 100) 
                        : 0);
            }
        }

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrderById,
    getAllOrdersAdmin
};
