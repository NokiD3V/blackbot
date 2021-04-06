const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({

  id: { type: String, unique: true }, //ID of the guild
  registeredAt: { type: Number, default: Date.now() },

}));
