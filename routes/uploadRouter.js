const express = require("express")
const { uploadController } = require("../controllers/uploadController")

let uploadRouter = express.Router()

uploadRouter
    .route("/")
    .post(async (req, res) => {
        console.log("Welcome to Upload")
        await uploadController(req, res)
    })

module.exports = { uploadRouter }