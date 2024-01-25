const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to database on ${conn.connection.host}`);
        return conn;
    }catch(err) {
        console.log(err);
    }
}

module.exports = connectDB