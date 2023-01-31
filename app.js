const express = require("express")
const path = require("path")
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/download', (req, res) => {
    res.render("download")
})

app.listen(PORT, () => {
    console.log("Server is Listening on port 5000...")
})

