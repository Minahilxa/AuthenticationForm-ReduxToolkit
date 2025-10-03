// db.js — connect mongoose to MongoDB
const mongoose = require('mongoose');

const connectDB = async () => { 
    //Connection operations are inherently slow (I/O operations), so async/await is used to handle them cleanly.
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      //functions used to avoid run-time warnings.
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
