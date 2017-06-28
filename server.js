const express = require('express');
const h2 = require('spdy')
const fs = require('fs')
const path = require('path')
const debug = require('debug') ('h2_server')
const spParser = require('h2-server-push')
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 8081;

let registerParser = spParser('public');

app.get('/', cookieParser(), registerParser,  (req, res) => {
    res.sp('index.html', 'public')
})

h2.createServer({
    key: fs.readFileSync('./certificate/key.pem'),
    cert: fs.readFileSync('./certificate/cert.pem')
}, app)

.listen(PORT, (err) => {   if(err) {
    debug(`error!!!!!!!:${err}`)
        throw new Error(err)
    }
    debug(`listening at localhost:${PORT}`)
})
