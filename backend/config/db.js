// db.js
const mongoose =  require('mongoose')

// connectDB FUNTION
const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB conneted: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
 };

module.exports = connectDB