const {s3Download} = require("../models/downloadModel")
const {apiDownloadMaker} = require('./apiDownloadController')

const apiDownloadController = apiDownloadMaker(s3Download)

module.exports = {apiDownloadController}