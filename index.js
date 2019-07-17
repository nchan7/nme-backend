const express = require('express');
const mongoose = require('mongoose');
const Airline = require('./models/airline');
const Flight = require('./models/flight');

const app = express();

app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/nme-backend');

// airline create
app.post('/airlines', (req, res) => {
    Airline.create({
        name: req.body.name,
        destinations: req.body.destinations,
        fleetsize: req.body.fleetsize, 
        flights: [req.body.flight1, req.body.flight2,req.body.flight3] 
    }, function(err, airline) {
        res.json(airline)
    })
})

// app.post('/airlines/:id', (req, res) => {
//     Airline.findById(req.params.id, function(err, airline) {
//         Flight.findById(req.body.id, function(err, flight) {
//             airline.flights.push(flight); // can be explicit and push product._id
//             airline.save (function(err) {
//                 if (err) res.json(err)
//                 res.json(order)
//             })
//         })
//     })
// })

// airline read all 
app.get('/airlines', (req, res) => {
    Airline.find({}, function(err, airlines) {
        if (err) res.json(err)
        res.json(airlines)
    })
})


// airline read one
app.get('/airlines/:id', (req, res) => {
    Airline.findById(req.params.id, function (err, airline) {
        if (err) res.json(err)
        res.json(airline)
    })
})


// airline update
app.put("/airlines/:id", (req, res) => {
    Airline.findOneAndUpdate({_id: req.params.id}, 
        {$set: 
            {destinations: req.body.destinations, fleetsize: req.body.fleetsize}
        }, {new: true}, function(err, airline) {
        if (err) res.json(err)
        res.json(airline)
    })
})



// airline delete
app.delete("/airlines/:id", (req, res) => {
    Airline.findOneAndRemove({_id: req.params.id}, function(err) {
        if (err) res.json(err)
        res.json({message: "DELETED!"})
    })
})



// flight create
app.post('/flights', (req, res) => {
    Flight.create({
        origin: req.body.origin,
        destination: req.body.destination,
        price: req.body.price
    }, function(err, airline) {
        res.json(airline)
    })
})

// flight read one
app.get('/flights', (req, res) => {
    Flight.find({}, function (err, flight) {
        if (err) res.json(err)
        res.json(flight)
    })
})


// flight read one
app.get('/flights/:id', (req, res) => {
    Flight.findById({_id: req.params.id}, function (err, flight) {
        if (err) res.json(err)
        res.json(flight)
    })
})



// flight delete
app.delete("/flights/:id", (req, res) => {
    Flight.findOneAndRemove({_id: req.params.id}, function(err) {
        Airline.flights.update({name: req.body.name}, {$pull: {flights: {_id: req.params.id}}}, function (err, airline) {
            if (err) res.json(err)
            res.json({message: "DELETED!"})
        })
})
})



// app.delete("/flights/:id", (req, res) => {
    // Remove from parent and then remove from child
    // })

// }) 













app.listen(3001, () => {
    console.log("Hunting cobras on 3001 🦊🦊🦊🦊🦊🦊🦊")
})