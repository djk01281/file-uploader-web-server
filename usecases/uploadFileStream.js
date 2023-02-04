const uploadFileStreamMaker = (pipeToWriteStream) => {
    return async function (readStream, key) {
        try {
            await pipeToWriteStream(readStream, key)
            console.log("pipe finished")
        }
        catch (error) {
            throw(error)
        }
    }
}

module.exports = { uploadFileStreamMaker }
