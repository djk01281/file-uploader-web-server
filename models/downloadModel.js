// const fs = require('fs')
// const { pipeline, Stream } = require('stream')
// const { promisify } = require('util');
// const pipelineAsync = promisify(pipeline)
// const path = require('path');
// const readdirAsync = promisify(fs.readdir)
// const unlinkSync = promisify(fs.unlink)
// const{Readable, Passthrough} = require("stream")
const { S3Client, GetObjectAclCommand, GetObjectCommand } = require("@aws-sdk/client-s3")




const s3Download = (res, key) => {


    return new Promise(async (resolve, reject) => {
        try {
            const bucketName = process.env.BUCKET_NAME
            const bucketRegion = process.env.BUCKET_REIGION
            const accessKey = process.env.ACCESS_KEY
            const secretAccessKey = process.env.SECRET_ACCESS_KEY

            console.log(bucketName)

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

            await s3.send(getObject).Body.pipe(res)
            resolve()
        }
        catch (error) { }
        reject(error)
    })

}

module.exports = { s3Download }
