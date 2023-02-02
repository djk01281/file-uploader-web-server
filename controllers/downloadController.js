const {s3Download} = require("../models/downloadModel")

const downloadController = async (req, res) =>{
    const key = req.params.id
    
    try{
        await s3Download(req, dest, key)
        console.log("downloaded")
        res.send("downloaded")
    }

    catch(error){
        console.log(error)
        res.send(error)
    }
}
module.exports = {downloadController}