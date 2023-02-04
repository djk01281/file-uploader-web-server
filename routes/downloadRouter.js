const { resolveAny } = require("dns")
const express = require("express")
const path = require("path")
const{downloadController} = require('../controllers/index')

let downloadRouter = express.Router()

downloadRouter.use(express.static(path.join(__dirname, '..', 'public', 'download')))
downloadRouter
    .route("/")
    .get((req, res) => { res.end() })

downloadRouter
    .route("/:id")
    .get(async (req, res) => {
        await downloadController(req, res)
    })

module.exports = { downloadRouter }