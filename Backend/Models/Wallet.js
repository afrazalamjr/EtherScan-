const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    transactions: [
        {
            blockNumber: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now },
            gas: { type: Number, default: '' },
        },
    ],
});

module.exports = mongoose.model('Wallet', WalletSchema);
