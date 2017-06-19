const express = require('express');
const h2 = require('spdy')
// const h2 = require('http2')
// const h2 = require('https')
const fs = require('fs')
const path = require('path')
const debug = require('debug') ('server')
const spParser = require('./themiddleware.js')

// express.request.__proto__ = h2.IncomingMessage.prototype;
// express.response.__proto__ = h2.ServerResponse.prototype;

const app = express();

// const jq = fs.readFileSync('./jquery.min.js')
// const processing = fs.readFileSync('./processing.min.js')
const index = fs.readFileSync('./index.html')

// app.use(express.static('.'))

// app.get('/', (req, res) => {
//   let push = res.push('/jquery.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/jquery.min.js')).pipe(push);
//   push = res.push('/processing.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/processing.min.js')).pipe(push);
//   res.end(index);
// })

app.get('/', spParser,  (req, res) =>{
    res.sp('index.html')
})

const PORT = 3000;

// app.listen(3000)

h2.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}, app)

.listen(PORT, (err) => {   if(err) {
    debug(`error!!!!!!!:${err}`)
        throw new Error(err)
    }
    debug(`listening at localhost:${PORT}`)
})