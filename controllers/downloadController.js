const { Response } = require("aws-sdk")
const { s3Download, s3CheckKey } = require("../models/downloadModel")

const downloadController = (key) => {
    return new Promise(async (resolve, reject) => {

        try {
            const url = await s3Download(key)
            console.log(url)
            console.log("downloaded")
            resolve(url)
        }

        catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const checkDownload = (key) => {
    return new Promise(async (resolve, reject) => {
        console.log(`Searching for: ${key} in checkDownload`)
        try {
            const response = await s3CheckKey(key)
            console.log(`Respose Is: ${response}`)
            resolve(response)
        }

        catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

module.exports = { downloadController, checkDownload }