const express = require('express')
const app = express()

app.set("view engine", "ejs")

// GET
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/cadastro", (req, res) => {
    res.render("cadastro.ejs")
})

app.get("/sucess", (req, res) => {
    res.render("sucess.ejs")
})

app.get("/principal", (req, res) => {
    res.render("principal.ejs")
})

app.get("/atualiza", (req, res) => {
    res.render("atualiza.ejs")
})

//
app.use(express.static('static'))

app.listen(port = 8080, () => {
    console.log(`Iniciando servido na porta: ${port}`)
})