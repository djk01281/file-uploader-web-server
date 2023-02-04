const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

//importing routers
const { apiRouter } = require("./routes/apiRouter");
const { downloadRouter } = require("./routes/downloadRouter");

//configuring envirionment variables for S3 Bucket
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
console.log("dotenv finished!");

//declare a directory static before sending or rendering.
console.log(__dirname);
app.use(express.static(path.join(__dirname, "public", "index")));
app.get("/", (req, res) => {
  console.log("Welcome Home");
  // res.sendFile(path.join(__dirname, "public", "index", "index.html"));
});

app.use("/download", downloadRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT} ...`);
});
