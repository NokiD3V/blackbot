const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({

    id: { type: String }, //ID of the user
    guildID: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },
    money: {type: Number, default: 0},
    messages: {type: Number, default: 0},
    voice_stats: {type: JSON, default:{
        last_connect: null,
        day: 0,
        week: 0,
        all: 0
    }},
    marry: {type: String, default: null},
    marry_joined: {type: Number, default: null}
}));
