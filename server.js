const express = require('express');
const h2 = require('spdy')
const fs = require('fs')
const path = require('path')
const debug = require('debug') ('h2_server')
const {spParser, preParse } = require('h2-server-push')

const app = express();
const PORT = 8081;



let resourceMap = spParser.parsedObj;
console.log("RS map", resourceMap)

app.get('/', spParser('public'),  (req, res) => {
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



// HTTP2
// const h2 = require('http2')
// const h2 = require('https')
// express.request.__proto__ = h2.IncomingMessage.prototype;
// express.response.__proto__ = h2.ServerResponse.prototype;
// const jq = fs.readFileSync('./jquery.min.js')
// const processing = fs.readFileSync('./processing.min.js')
// const index = fs.readFileSync('./index.html')
// app.get('/', (req, res) => {
//   let push = res.push('/jquery.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/jquery.min.js')).pipe(push);
//   push = res.push('/processing.min.js')
//   push.writeHead(200)
//   fs.createReadStream(path.join(__dirname, '/processing.min.js')).pipe(push);
//   res.end(index);
// })