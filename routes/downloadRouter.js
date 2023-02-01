const express = require("express")
const path = require("path")

let downloadRouter = express.Router()

downloadRouter.use(express.static(path.join(__dirname, '..', 'public', 'download')))
downloadRouter
.route("/:id")
.get((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','download', 'download.html'))
})

module.exports = {downloadRouter}