const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://admin:admin123@clustercomp3123.llert.mongodb.net/?retryWrites=true&w=majority&appName=Clustercomp3123";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB_URL)
.then(() => {
    console.log("Successfully connected to MongoDB Atlas Server");
})
.catch(err => {
    console.error("Could not connect to the database. Exiting now...", err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note-taking application - Week06 Exercise</h1>");
});

app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    res.status(201).json({ message: 'Note created successfully', note: { title, content } });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
