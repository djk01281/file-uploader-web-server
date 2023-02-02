// const fs = require('fs')
// const { pipeline, Stream } = require('stream')
// const { promisify } = require('util');
// const pipelineAsync = promisify(pipeline)
// const path = require('path');
// const readdirAsync = promisify(fs.readdir)
// const unlinkSync = promisify(fs.unlink)
const Busboy = require('busboy')
// const{Readable, Passthrough} = require("stream")
const AWS = require("aws-sdk")



const s3Upload = (req, key) => {
    

    return new Promise( (resolve, reject) => {

        const bucketName = process.env.BUCKET_NAME
        const bucketRegion = process.env.BUCKET_REIGION
        const accessKey = process.env.ACCESS_KEY
        const secretAccessKey = process.env.SECRET_ACCESS_KEY
    
        console.log(bucketName)
        const s3 = new AWS.S3(
        {
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey
            },
            region: bucketRegion
        }
        )   

    console.log("S3")
    const busboy = Busboy({ headers: req.headers })
    busboy.on('error', (error) => {
        console.log(error)
        reject(error)
    })

    const requestFileName = req.headers['file-name']

    busboy.on('file',  (fieldName, fileStream, fileName, encoding, mimeType) => {
        
        s3.upload({
            Bucket: bucketName,
            Key: requestFileName,
            Body: fileStream,
        }).promise()
        .then(() => resolve())
        .catch((error)=>{
            console.log(error)
            reject(errror)
        }
        )
    })
    req.pipe(busboy)
    })
    
}

module.exports = { s3Upload }
