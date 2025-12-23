const mongoose = require('mongoose');


const Connect_Database = () =>{
    mongoose.connect(process.env.DB_URI, {family: 4})
    .then(() => console.log('Database : Mongodb Connected Successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
}



module.exports = Connect_Database;