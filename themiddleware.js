const debug = require('debug')('spParser')
const fs = require('fs')
const extractor = require('html-static-asset-path-extractor')
//USE POYU MODULE

const readFileAsync = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

const pushSingle = (res, resource) => {
    return new Promise((resolve, reject) => {
        const {filePath, contentType} = resource
        if (!res.push) reject(new Error('NO SPDY'))
        readFileAsync(filePath)
        .then(file => {
            let pushStream = res.push('/' + filePath, {
                req: { 'accept' : '**/*'},
                res: {'content-type' : contentType}
            }, (file) => resolve({ value: file, status: "resolved"}))
            pushStream.end(file)
        }, (error) => resolve({value:error, status: "rejected"}))
        // .catch(err => {
        //     debug('err', err)
        //     return Promise.reject(res);
        // })
    })
}

const spParser = (req, res, next) => {
    const sp = (htmlPath) => {
        const html = fs.readFileSync(htmlPath);
        const resources = extractor(htmlPath)
        debug('adsfasdf', resources)
        // const resources =  [ {filePath: 'awesum.jpg', contentType: 'img/jpeg'}, {filePath: 'salt.jpg', contentType: 'img/jpeg'} ]
        const PromiseArr = resources.map(cur => pushSingle(res, cur))

        Promise.all(PromiseArr)
        .then((files)=>{
            res.status(200);
            res.end(html)
            
        })
        .catch((err)=>{
            debug("error in streaming files:", err)
            res.status(500);
            res.send(err)
        })
    }
    //add method
    res.sp = sp;
    next()
}

module.exports = spParser;