const mongoose = require('mongoose');

// Connect à la base de donnée 
const connectDB = async () => {
    const conn = await mongoose.connect("mongodb+srv://project-6:project-6@cluster0-ywms4.mongodb.net/test", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB;