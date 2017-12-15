var fs = require('fs')

function getDestination (req, file, cb) {
    cb(null, '/dev/null')
}

function MyCustomStorage (opts) {
    this.getDestination = (opts.destination || getDestination)
}

MyCustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
    this.getDestination(req, file, function (err, path) {
        if (err) return cb(err)

        const options = {
            flags:'w',
            encoding:'utf8',
            fd:null,
            mode:null,
            autoClose:true,
            start: 0
        }

        //判断文件是否存在
        function fsExistsSync(path,options) {
            try{
                fs.accessSync(path,fs.F_OK);
            }catch(e){
                options.flags='w'
                // console.log('11111')
                if(parseInt(req.body.start)!=0){
                    options.start = parseInt(req.body.start)
                }
                return false;
            }
            options.flags='r+'
            options.start = parseInt(req.body.start)
            // console.log('2222')
            return true;
        }
        // console.log('is exist = '+ fsExistsSync(path,options))
        fsExistsSync(path,options)
        console.log('start = '+options.start)
        var outStream = fs.createWriteStream(path,options)
        file.stream.pipe(outStream)
        outStream.on('error', cb)
        outStream.on('finish', function () {
            cb(null, {
                path: path,
                size: outStream.bytesWritten
            })
        })
    })
}

MyCustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {
    fs.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new MyCustomStorage(opts)
}