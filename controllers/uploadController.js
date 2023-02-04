const uploadControllerMaker = (getRandomString, uploadFileStream) =>{
    return async function (req, res){
        const random = getRandomString(10)
        const fileType = req.headers['file-type']
        const key = random + fileType

        console.log(key)

        try {
            const response = await uploadFileStream(req, key)
            console.log(response)
            res.end(key)
            return
        }
        catch (error) {
            console.log(error)
            throw(error)
        }
    }
}

module.exports = { uploadControllerMaker }
