const express = require('express')
const { randomString } = require("../utils/randomString")
const { s3Upload } = require("../models/uploadModel")
// const storage = multer.memoryStorage()
// const upload = multer({storage: storage})

const uploadController = (req) => {
    return new Promise(async (resolve, reject) => {
        const random = randomString(10)
        const fileType = req.headers['file-type']
        const key = random + fileType

        console.log(key)

        try {
            const response = await s3Upload(req, key)
            console.log(response)
            resolve(key)
        }
        catch (error) {
            console.log(error)
            reject(error)
        }
    })

}

module.exports = { uploadController }
