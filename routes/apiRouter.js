const express = require("express")
const path = require("path")
const { downloadController } = require('../controllers/downloadController')
const { uploadController } = require('../controllers/uploadController')

let apiRouter = express.Router()

apiRouter
    .route("/download/:id")
    .get(async (req, res) => {
        console.log(`Download Route: ${req.params.id}`)
        const url = await downloadController(req.params.id)
        console.log(url)
        res.end(url)
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