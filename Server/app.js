const express = require('express');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(cors());


// Auth Routing 

const Auth_Route = require('./Routes/Auth-Routes')
app.use('/api/authenticate', Auth_Route);


// Auth Routing 

const User_Route = require('./Routes/User-Routes')
app.use('/api/user', User_Route);

// Admin Product Routes

const Admin_Product_Route = require('./Routes/Admin-Products-Routes');
app.use('/api/admin/products', Admin_Product_Route);

// Products Route User

const User_Product_Route = require('./Routes/Product-Routes');
app.use('/api/products', User_Product_Route);

// Cart Route 

const Cart_Route = require('./Routes/Cart-Routes');
app.use('/api/cart', Cart_Route);

// Cart Items Route 
const Cart_Items_Route = require('./Routes/Cart-Items-Routes');
app.use('/api/user/cart-items', Cart_Items_Route);


// Order Routes
const Order_Route = require('./Routes/Order-Routes');
app.use('/api/orders', Order_Route);

// Admin Order Routes
const Admin_Order_Route = require('./Routes/Admin-Order-Routes');
app.use('/api/admin/orders', Admin_Order_Route);

// Reviews Route  
const Review_Route = require('./Routes/Review-Routes');
app.use('/api/review', Review_Route);

// Rating Route  
const Rating_Route = require('./Routes/Rating-Routes');
app.use('/api/rating', Rating_Route);

// Address Route  
const Address_Route = require('./Routes/Address-Routes');
app.use('/api/user', Address_Route);


const Wishlist_Route = require('./Routes/Wishlist_Routes');
app.use('/api/wishlist', Wishlist_Route);



// Payments Routes
const Payment_Route = require('./Routes/Payment-Routes');
app.use('/api/payments',Payment_Route );



module.exports = app;