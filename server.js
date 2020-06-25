const { createServer } = require('http');
const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
const morgan = require('morgan')

const port = process.env.PORT || 8080;

const dev = app.get('env') !== 'production';

if (!dev) {
    app.disable('x-powered-by');
    app.use(compression());
    app.use(morgan('common'));

    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '/build', '/index.html'));
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
