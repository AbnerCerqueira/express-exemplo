const express = require('express')
const userDao = require('../dao/user-dao')
const router = express.Router()
router.use((req, res, next) => {
    next()
})

router.get("/:username", (req, res) => {
    const username = req.params.username
    if (!req.session.user) {
        res.status(404).send("Você precisa fazer login para acessar essa página")
        return
    }
    res.render("principal.ejs", {
        username: req.session.user.username,
        id: req.session.user.id
    })
})

router.get("/:username/atualiza", (req, res) => {
    if (!req.session.user) {
        res.status(404).send("Você precisa estar logado pra atualizar algo")
        return
    }
    res.render("atualiza.ejs", {
        id: req.session.user.id,
        username: req.session.user.username
    })
})

router.post("/:username/atualiza", async (req, res) => {
    const username = req.body.usernameInput
    const id = req.body.idInput
    await userDao.updateData(username, id)
    req.session.user.username = username
    res.redirect(`/user/${req.session.user.username}`)
})

router.post("/desloga", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

router.post("/delete", async (req, res) => {
    await userDao.deleteData(req.body.idInput)
    req.session.destroy()
    res.redirect("/")
})

module.exports = router