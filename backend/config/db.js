const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`mongo DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`error is ${error.message}`);
    }
}

module.exports = connectDB;