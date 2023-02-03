const express = require("express")
const path = require("path")
const { downloadController } = require('../controllers/downloadController')

let downloadRouter = express.Router()

downloadRouter.use(express.static(path.join(__dirname, '..', 'public', 'download')))

downloadRouter
    .route("/")
    .get((req, res) => {
        console.log("Welcome to Download")
        res.sendFile(path.join(__dirname, '..', 'public', 'download', 'download.html'))
    })

downloadRouter
    .route("/:id")
    .get(async (req, res) => {
        console.log(req.params.id)
        const url = await downloadController(req.params.id)
        console.log(url)
        res.end(url)
    })

module.exports = { downloadRouter }