const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name: String,
    destinations: Number, 
    fleetsize: Number,
    flights: [{type: mongoose.Schema.Types.ObjectId, ref: 'Flight'}]
})


const Airline = mongoose.model('Airline', airlineSchema);

module.exports = Airline; 