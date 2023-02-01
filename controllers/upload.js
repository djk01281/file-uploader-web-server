const multer = require('multer')
const express = require('express')


// const storage = multer.memoryStorage()
// const upload = multer({storage: storage})

const uploadController = express.Router()
uploadController
.route('/')
.post((req, res) => {
    const file = req.file
    console.log("File Received")
    // const fileBuffer = await SharedArrayBuffer(file.buffer)
})

module.exports = {uploadController}
