const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

// MongoDB connection



async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://harrypotter007007007007:abc@cluster0.c74zw.mongodb.net/superaData', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increased connection timeout to 15 seconds
            socketTimeoutMS: 60000, // Increased socket timeout to 60 seconds
        });
        console.log('MongoDB Connection Successful');
    } catch (err) {
        console.log('Error connecting to MongoDB: ', err);
    }
}

// Call the function to establish the connection
connectDB();


//


const Schema = mongoose.Schema;
const dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});

// Create the model for planets
const planetModel = mongoose.model('planets', dataSchema);

// Refactored POST route to use async/await
app.post('/planet', async (req, res) => {
    const { id } = req.body;

    try {
        // Find the planet based on the provided ID
        const planetData = await planetModel.findOne({ id });

        // If planet is not found, return an error response
        if (!planetData) {
            return res.status(404).send({ error: 'Planet not found' });
        }

        // Send the planet data as the response
        res.send(planetData);
    } catch (err) {
        // Log the error and return a server error message
        console.error("Error fetching planet data:", err);
        res.status(500).send({ error: "Error fetching planet data from the database." });
    }
});

// Serve the index.html file
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Fetch OS Details
app.get('/os', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
});

// Liveness check endpoint
app.get('/live', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
});

// Readiness check endpoint
app.get('/ready', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server successfully running on port - " + 3000);
});

module.exports = app;                
