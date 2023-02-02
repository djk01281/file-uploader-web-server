const express = require("express")
const path = require("path")
const {downloadController} = require('../controllers/downloadController')

let downloadRouter = express.Router()

downloadRouter.use(express.static(path.join(__dirname, '..', 'public', 'download')))

downloadRouter
.route("/")
.get((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','download', 'download.html'))
})

downloadRouter
.route("/:id")
.get((req, res) => {
    downloadController(req, res)
})

module.exports = {downloadRouter}