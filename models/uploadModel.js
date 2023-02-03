// const fs = require('fs')
const { pipeline, Stream } = require('stream')
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline)
// const path = require('path');
// const readdirAsync = promisify(fs.readdir)
// const unlinkSync = promisify(fs.unlink)
const Busboy = require('busboy')
// const{Readable, Passthrough} = require("stream")
const AWS = require("aws-sdk");
const { ReadStream } = require('fs');



const s3Upload = (req, key) => {
    return new Promise(async (resolve, reject) => {
        try {
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

            busboy.on('file', (fieldName, fileStream, fileName, encoding, mimeType) => {
                console.log("file")
                s3.upload({
                    Bucket: bucketName,
                    Key: key,
                    Body: fileStream,
                }).promise()
                .then(() => {resolve("busboy finished")})
                .catch((error) => {reject(error)})
            })

            req.pipe(busboy)

        }
        catch (error) {
            reject(error)
        }
    }
    )


}

module.exports = { s3Upload }
