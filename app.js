const express = require('express')
const session = require('express-session')
const database = require('./database')
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'me arrumem um emprego',
    resave: false,
    saveUninitialized: false
}))

// GET
app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/cadastro", (req, res) => {
    const error = req.query.error
    res.render("cadastro.ejs", {
        error
    })
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

// POST
app.post("/cadastro", async (req, res) => {
    const data = req.body
    if (!data.usernameInput || !data.passwordInput){
        res.redirect("/cadastro?error=empty")
        return
    }
    if (data.passwordInput === data.passwordCheckInput){
        await database.setData(data)
        res.redirect("/sucess")
        return
    }
    res.redirect("/cadastro?error=error")
})

//
app.use(express.static('static'))

app.listen(port = 8080, () => {
    console.log(`Iniciando servido na porta: ${port}`)
})