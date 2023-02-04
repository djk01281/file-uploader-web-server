const downloadControllerMaker = (downloadStaticPath, checkFileExists) => {
    return async function(req, res){
        console.log("Welcome to Download")
        const key = req.params['id']
        console.log(`id is: ${key}`)
        const keyExists = await checkFileExists(key)

        if (keyExists) {
            res.sendFile(downloadStaticPath)
        }
        else {
            res.status(404).send('Not Found')
        }
    }
}

module.exports = { downloadControllerMaker}