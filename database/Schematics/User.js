const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({

    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    money: { type: Number, default: 0 },
    
}));
