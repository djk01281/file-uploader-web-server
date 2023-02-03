const express = require("express")
const path = require("path")
const { checkDownload } = require('../controllers/downloadController')

let downloadRouter = express.Router()

downloadRouter.use(express.static(path.join(__dirname, '..', 'public', 'download')))
downloadRouter
    .route("/")
    .get((req, res) => { res.end() })

downloadRouter
    .route("/:id")
    .get(async (req, res) => {
        console.log("Welcome to Download")
        const key = req.params['id']
        console.log(`id is: ${key}`)
        const keyExists = await checkDownload(key)

        if (keyExists) {
            res.sendFile(path.join(__dirname, '..', 'public', 'download', 'download.html'))
        }
        else {
            res.status(404).send('Not Found')
        }
    })

module.exports = { downloadRouter }