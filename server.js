// Setup empty JS object to act as endpoint for all routes
projectData = [];
makeId = [0];
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('Weather'));
 
// Setup Server
let port = 5050;
const server = app.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
})

app.get('/getdata', (req, res) => {
    res.send(projectData);
});

app.get('/getId', (req,res) => {
  makeId[0]++
  res.send(makeId);
})

app.post('/postdata', (req, res) => {
    const newData = req.body;
    projectData.push(newData);
    res.send(projectData);
});

app.post('/post', (req, res) => {
  projectData = req.body;
})
