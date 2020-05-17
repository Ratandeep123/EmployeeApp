const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')


app.use(bodyParser.json())

const Employee = mongoose.model("employee")
const mongoUri = "mongodb+srv://username of mongo atlas :Add Password@cluster0-akdiy.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo yeeeee")
})


mongoose.connection.on("error", (err) => {
    console.log("Connection error", err)
})

app.get('/', (req, res) => {
    Employee.find({}).then(data => [
        res.send(data)
    ]).catch(err => {
        console.log(err)
    })
})

// Send Data From fronted to backend
app.post('/send.data', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        position: req.body.position,
        picture: req.body.picture
    })
    employee.save()
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    // res.send("posted")
})
// Delete data from data base
app.post('/delete', (req, res) => {
    Employee.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
})

// Update Data from database


app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        position: req.body.position,
        picture: req.body.picture
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })


})
// Run the code on this port
app.listen(3000, () => {
    console.log("server running")
})

