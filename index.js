const express = require('express');
const mongoose = require('mongoose');
const Airline = require('./models/airline');
const Flight = require('./models/flight');

const app = express();

app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/nme-backend');

// airline create
app.post('/airline', (req, res) => {
    Airline.create({
        name: "Southwest",
        destinations: 101,
        fleetSize: 754   
    }, function(err, airline) {
        res.json(airline)
    })
})

// airline read all 
app.get('/airline', (req, res) => {
    Airline.find({}, function(err, airlines) {
        if (err) res.json(err)
        res.json(airlines)
    })
})


// airline read one
app.get('/airline/:id', (req, res) => {
    Airline.findById(req.params.id, function (err, airline) {
        if (err) res.json(err)
        res.json(airline)
    })
})


// airline update
app.put("/airline/:id", (req, res) => {
    Airline.findOneAndUpdate({name: "Southwest"}, 
        {$set: 
            {meta: 
                    {age: 44, website: "ga.com" }
            }
        }, {new: true}, function(err, airline) {
        if (err) res.json(err)
        res.json(airline)
    })
})



// airline delete
app.delete("/airline", (req, res) => {
    Airline.findOneAndRemove({name: "Alaska"}, function(err) {
        if (err) res.json(err)
        res.json({message: "DELETED!"})
    })
})



// flight create
app.post('/flight', (req, res) => {
    Flight.create({
        origin: "Seattle",
        destination: "Oakland",
        price: 300
    }, function(err, airline) {
        res.json(airline)
    })
})



// flight read one
app.get('/flight/:id', (req, res) => {
    Flight.findById(req.params.id, function (err, flight) {
        if (err) res.json(err)
        res.json(flight)
    })
})



// flight delete
app.delete("/airline", (req, res) => {
    Flight.findOneAndRemove({origin: "Seattle"}, function(err) {
        if (err) res.json(err)
        res.json({message: "DELETED!"})
    })
})











app.listen(3000, () => {
    console.log("Hunting cobras on 3000 🦊🦊🦊🦊🦊🦊🦊")
})