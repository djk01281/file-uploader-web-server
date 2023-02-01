const express = require("express")
const path = require("path")
const { uploadController } = require("./controllers/upload")
const app = express()
const PORT = 5003

const {downloadRouter} = require("./routes/downloadRouter")

//declare a directory static before sending or rendering.
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index', 'index.html'))
})

app.use("/download", downloadRouter)
app.use("/upload", uploadController)

app.listen(PORT, () => {
    console.log("Server is Listening on port 5000...")
})