const Connect_Database = require('./Config/db');
const app = require('./app');
const dotenv = require ('dotenv');


dotenv.config({path:"./Config/.env"});

// Database Connection
Connect_Database();




app.listen(process.env.PORT, () =>{
    console.log(`Server : Woriking On http://localhost:${process.env.PORT}`)
})