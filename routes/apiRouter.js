const express = require("express")
const path = require("path")
const { apiDownloadController } = require('../controllers/index')
const { uploadController } = require('../controllers/uploadController')

let apiRouter = express.Router()

apiRouter
    .route("/download/:id")
    .get(async (req, res) => {
        await apiDownloadController(req, res)
    })

apiRouter
    .route("/upload")
    .post(async (req, res) => {
        console.log("Welcome to Upload")
        const result = await uploadController(req)
        console.log(`result: ${result}`)
        res.end(result)
    })


module.exports = { apiRouter }