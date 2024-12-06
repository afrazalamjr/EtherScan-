
const mongoose = require('mongoose');

// MongoDB URI (Make sure to replace this with your actual MongoDB connection string)
const mongoURI = 'mongodb+srv://afrazjr:dHTjdw2e9Jq43zg@atlascluster.xvgawbg.mongodb.net/yourDatabaseName'; // Use your DB URI or environment variable

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using mongoose
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    // If there's an error, log it and exit the process
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure code
  }
};

// Export the function so it can be used in your app
module.exports = connectDB;
