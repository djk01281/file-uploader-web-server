const express = require("express")
const path = require("path")
const app = express()
const PORT = 5003

//declare a directory static before sending or rendering.
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/download/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','download.html'))
})
app.listen(PORT, () => {
    console.log("Server is Listening on port 5000...")
})