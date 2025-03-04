const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://harr:abcffff@cluster0.c74zw.mongodb.net/superaData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log("MongoDB Connection Error: " + err);
    } else {
        console.log("MongoDB Connection Successful");
    }
});

// Schema and Model Setup
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
const planetModel = mongoose.model('planets', dataSchema);

// POST /planet Route
app.post('/planet', async function(req, res) {
    const { id } = req.body;

    // Validate that ID is a number between 0 and 9
    if (typeof id !== 'number' || id < 0 || id > 9) {
        return res.status(400).send({ error: "Please select a valid planet ID between 0 and 9." });
    }

    try {
        const planetData = await planetModel.findOne({ id });

        if (!planetData) {
            return res.status(404).send({ error: "Planet not found with the provided ID." });
        }

        res.send(planetData);
    } catch (err) {
        // Log the error and return a server error message
        console.error("Error fetching planet data:", err);
        res.status(500).send({ error: "Error fetching planet data from the database." });
    }
});

// Get the index.html page
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// OS Endpoint
app.get('/os', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV || 'development' // Default to 'development' if NODE_ENV is not set
    });
});

// Health Check - Liveness
app.get('/live', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ "status": "live" });
});

// Health Check - Readiness
app.get('/ready', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ "status": "ready" });
});

// Start Server
app.listen(3000, () => {
    console.log("Server successfully running on port - 3000");
});

module.exports = app;
