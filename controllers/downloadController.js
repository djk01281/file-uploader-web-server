const {s3Download} = require("../models/downloadModel")

const downloadController = async (req, res) =>{
    const key = req.params.id
    
    try{
        await s3Download(res, key)
        console.log("downloaded")
    }

    catch(error){
        console.log(error)
        res.send(error)
    }
}
module.exports = {downloadController}