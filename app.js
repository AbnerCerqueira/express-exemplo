const express = require('express')
const session = require('express-session')
const database = require('./database')
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'me arrumem um emprego',
    resave: false,
    saveUninitialized: false
}))

// GET
app.get("/", (req, res) => {
    res.render("index.ejs", {
        error: req.query.error
    })
})

app.get("/cadastro", (req, res) => {
    res.render("cadastro.ejs", {
        error: req.query.error
    })
})

app.get("/sucess", (req, res) => {
    res.render("sucess.ejs")
})

app.get("/principal", (req, res) => {
    if (!req.session.user) {
        res.status(404).send("Você precisa fazer login para acessar essa página")
        return
    }
    res.render("principal.ejs", {
        username: req.session.user.username,
        id: req.session.user.id
    })
})

app.get("/atualiza", (req, res) => {
    if (!req.session.user){
        res.status(404).send("Você precisa estar logado pra atualizar algo")
        return
    }
    res.render("atualiza.ejs", {
        id: req.session.user.id,
        username: req.session.user.username
    })
})

// POST
// CREATE
app.post("/cadastro", async (req, res) => {
    const data = req.body
    if (!data.usernameInput || !data.passwordInput) {
        res.redirect("/cadastro?error=empty")
        return
    }
    if (data.passwordInput === data.passwordCheckInput) {
        await database.setData(data)
        res.redirect("/sucess")
        return
    }
    res.redirect("/cadastro?error=error")
})

// READ
app.post("/login", async (req, res) => {
    const data = req.body
    const rows = await database.getData(data)
    if (rows.length > 0) {
        req.session.user = {
            id: rows[0].id,
            username: rows[0].username
        }
        res.redirect("/principal")
        return
    }
    res.redirect("/?error=error")
})

// UPDATE
app.post("/atualiza", async (req, res) => {
    const data = {
        username: req.body.usernameInput,
        id: req.body.idInput
    }
    await database.updateData(data.username, data.id)
    req.session.user.username = data.username
    res.redirect("/principal")
})

// DELETE
app.post("/desloga", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

app.post("/delete", async (req, res) => {
    await database.deleteData(req.body.idInput)
    req.session.destroy()
    res.redirect("/")
})

//
app.use(express.static('static'))

app.listen(port = 8080, () => {
    console.log(`Iniciando servido na porta ${port}`)
})