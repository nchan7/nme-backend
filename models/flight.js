const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    origin: String,
    destination: String, 
    price: Number,
})


const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight; 