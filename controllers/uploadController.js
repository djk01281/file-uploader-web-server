const express = require('express')
const {randomString} = require("../utils/randomString")
const {s3Upload} = require("../models/uploadModel")
// const storage = multer.memoryStorage()
// const upload = multer({storage: storage})

const uploadController = async(req, res) => {
    
    const key = randomString(10)
    console.log(key)

    try{
    await s3Upload(req, key)
    res.end(key)
    }
    catch (error){
        console.log(error)
    }
}

module.exports = {uploadController}
