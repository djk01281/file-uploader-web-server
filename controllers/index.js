//Import Dependencies
const path = require('path')

//Make apiDownloadController
const { getDownloadLink } = require("../usecases/index")
const { apiDownloadMaker } = require('./apiDownloadController')
const apiDownloadController = apiDownloadMaker(getDownloadLink)

//Make downloadController
const {downloadControllerMaker} = require('./downloadController')
const {checkFileExists} = require('../usecases/index')
const downloadStaticPath = path.join(__dirname, '..', 'public', 'download', 'download.html')
const downloadController = downloadControllerMaker(downloadStaticPath , checkFileExists)

//Make uploadController
const { randomString } = require("../utils/randomString")
const { uploadFileStream } = require("../usecases/index")
const {uploadControllerMaker} = require('./uploadController')
const uploadController = uploadControllerMaker(randomString, uploadFileStream)


module.exports = {apiDownloadController, downloadController, uploadController}