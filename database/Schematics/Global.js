const mongoose = require("mongoose");

module.exports = mongoose.model("Global", new mongoose.Schema({

    bitcoin: {type: Number, defualt: 50000},
    miners:[{type:Object}]
}));
