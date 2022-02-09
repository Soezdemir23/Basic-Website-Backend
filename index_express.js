const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/style")))
// we want to use the public folder, only looks up the folder
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public/about.html"))
})

app.get("/contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "public/contact-me.html"))
})


app.all("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public/404.html"));
})


app.listen(port, () => {
    console.log(`Currently putting this up in: http://localhost:${port}`);
});
