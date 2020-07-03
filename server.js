const { createServer } = require('http');
const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
const morgan = require('morgan')
const report = require('./Models/UserReport.js');
const workout = require('./Models/WorkoutReport');
const config = require('config');
const mongoose = require('mongoose');
//const db = config.get('mongoURI');
const bodyParser = require('body-parser');

const User = require('./routes/api/user')

const db = require('./config/keys').mongoURI;

const port = process.env.PORT || 8080;
const dev = app.get('env') !== 'production';

// Connects to the database collection
mongoose
.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.lof(err));

mongoose
	.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.error(err));


app.use(bodyParser.json());
app.use('/api/user', User);

//const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));

if (!dev) {
    app.disable('x-powered-by');
    app.use(compression());
	app.use(morgan('common'));
	

    app.use(express.static(path.join(__dirname, 'build')))

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', '/index.html'));
    });
}

if (dev) {
    app.use(morgan('dev'));
}

const server = createServer(app);
server.listen(port, err => {
    if (err) throw err;

    console.log("Server started!");
})
