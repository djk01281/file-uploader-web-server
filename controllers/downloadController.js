const {s3Download} = require("../models/downloadModel")

const downloadController =  (key) =>{
    return new Promise(async (resolve, reject) => {
    
    try{
        const url =  await s3Download(key)
        console.log(url)
        console.log("downloaded")
        resolve(url)
    }

    catch(error){
        console.log(error)
        reject(error)
    }
})
}
module.exports = {downloadController}