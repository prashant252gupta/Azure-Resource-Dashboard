require("dotenv").config()
const express = require('express');
const resourceRoute = require('./routes/resources')
const connectDB = require('./config/DB_CONFIG');
const cors = require('cors')
const path = require('path');
//Connecting to Database
connectDB();

const app = express();

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')));

app.use('/azure', resourceRoute)

const port = process.env.PORT || 8000;

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`); //interpolation
    }
    console.log(`Server is running on port: ${port}`);
});