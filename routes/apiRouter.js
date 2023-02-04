const express = require("express")
const { apiDownloadController } = require('../controllers/index')
const { uploadController } = require('../controllers/index')

let apiRouter = express.Router()

apiRouter
    .route("/download/:id")
    .get(async (req, res) => {
        await apiDownloadController(req, res)
    })

apiRouter
    .route("/upload")
    .post(async (req, res) => {
        await uploadController(req, res)
    })


module.exports = { apiRouter }