const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://afrazjr:dHTjdw2e9Jq43zg@atlascluster.xvgawbg.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
connectDB();

// Define Wallet schema and model
const walletSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true },
    transactions: { type: Array, default: [] },
});

const Wallet = mongoose.model('Wallet', walletSchema);

// Add a wallet
app.post('/wallets', async (req, res) => {
    const { walletAddress, transactions } = req.body;
    console.log('Received data:', { walletAddress, transactions });
  
    try {
      const wallet = new Wallet({ walletAddress, transactions });
      await wallet.save();
      console.log('Wallet and transactions saved:', wallet);
      res.status(201).json(wallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get all wallets
app.get('/wallets', async (req, res) => {
    try {
        const wallets = await Wallet.find();
        res.json(wallets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Query transactions by wallet address and date range
app.get('/wallets/transactions', async (req, res) => {
    const { walletAddress, startDate, endDate } = req.query;

    if (!walletAddress || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required query parameters: walletAddress, startDate, or endDate' });
    }

    try {
        // Find the wallet by address
        const wallet = await Wallet.findOne({ walletAddress });

        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        // Filter transactions by date range
        const filteredTransactions = wallet.transactions.filter((tx) => {
            const txDate = new Date(parseInt(tx.timeStamp) * 1000); // Convert timestamp to Date
            return txDate >= new Date(startDate) && txDate <= new Date(endDate);
        });

        res.json({ walletAddress, transactions: filteredTransactions });
    } catch (error) {
        console.error('Error querying transactions:', error);
        res.status(500).json({ error: 'Failed to query transactions' });
    }
});


// Server setup
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
