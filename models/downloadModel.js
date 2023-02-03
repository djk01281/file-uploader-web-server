// const fs = require('fs')
// const { pipeline, Stream } = require('stream')
// const { promisify } = require('util');
// const pipelineAsync = promisify(pipeline)
// const path = require('path');
// const readdirAsync = promisify(fs.readdir)
// const unlinkSync = promisify(fs.unlink)
// const{Readable, Passthrough} = require("stream")
const { S3Client, GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3CheckKey = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bucketName = process.env.BUCKET_NAME
            const bucketRegion = process.env.BUCKET_REIGION
            const accessKey = process.env.ACCESS_KEY
            const secretAccessKey = process.env.SECRET_ACCESS_KEY
            console.log(`Key is: ${key}`)
            console.log(`Reaching Out To - ${bucketName} for Checking`)

            const s3 = new S3Client(
                {
                    credentials: {
                        accessKeyId: accessKey,
                        secretAccessKey: secretAccessKey
                    },
                    region: bucketRegion
                }
            )

            const command = new HeadObjectCommand({
                Bucket: bucketName,
                Key: key,
            })

            const response = await s3.send(command)

            console.log(response)
            const statusCode = response['$metadata']['httpStatusCode']
            resolve(response)
        }
        catch (error) {
            reject(error)
        }
    })
}

const s3Download = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bucketName = process.env.BUCKET_NAME
            const bucketRegion = process.env.BUCKET_REIGION
            const accessKey = process.env.ACCESS_KEY
            const secretAccessKey = process.env.SECRET_ACCESS_KEY

            console.log(bucketName)
            console.log(key)

            const s3 = new S3Client(
                {
                    credentials: {
                        accessKeyId: accessKey,
                        secretAccessKey: secretAccessKey
                    },
                    region: bucketRegion
                }
            )
            const getObject = new GetObjectCommand({
                Bucket: bucketName,
                Key: key,
            })
            const url = await getSignedUrl(s3, getObject, { expiresIn: 3600 })
            console.log(url)
            resolve(url)


        }
        catch (error) {
            reject(error)
        }
    })

}

module.exports = { s3Download, s3CheckKey }
