const express = require('express');
const spdy = require('spdy')
const fs = require('mz/fs')
const debug = require('debug') ('server')
const spParser = require('./themiddleware.js')

const app = express();

app.get('/', spParser,  (req, res) =>{
    res.sp('index.html')
})

const PORT = 3000;

spdy.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app)

.listen(PORT, (err) => {   if(err) {
    debug(`error!!!!!!!:${err}`)
        throw new Error(err)
    }
    debug(`listening at localhost:${PORT}`)
})