const checkFileExistsMaker = (checkDBforKey) =>{
    return async function(key){
        console.log(`Searching for: ${key} in checkFileExists`)
        try {
            return await checkDBforKey(key)
        }
        catch (error) {
            console.log(error)
            throw(error)
        }
    }
}

module.exports = {checkFileExistsMaker}
