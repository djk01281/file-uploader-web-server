const getDownloadLinkMaker = (getFileLink) => {
    return async function (key) {
        try {
            const link = await getFileLink(key)
            return link
        }
        catch (error) {
            console.log(error)
            throw (error)
        }
    }
}

module.exports = { getDownloadLinkMaker }