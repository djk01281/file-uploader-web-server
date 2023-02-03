const apiDownloadMaker = (getDownloadLink) => {
    return async function (req, res) {
        try {
            const key = req.params['id']
            const url = await getDownloadLink(key)
            console.log(url)
            res.end(url)
            return 
        }
        catch (error) {
            console.log(error)
            throw (error)
        }
    }
}

module.exports = {apiDownloadMaker}