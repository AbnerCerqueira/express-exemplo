const express = require('express')
const router = express.Router()
const userDao = require('../dao/user-dao')

router.use((req, res, next) => {
    next()
})

router.get('/', (req, res) => {
    res.render("index.ejs", {
        error: req.query.error
    })
})

router.get("/cadastro", (req, res) => {
    res.render("cadastro.ejs", {
        error: req.query.error
    })
})

// POST
router.post("/cadastro", async (req, res) => {
    const data = req.body
    if (!data.usernameInput || !data.passwordInput) {
        res.redirect("/cadastro?error=empty")
        return
    }
    if (data.passwordInput !== data.passwordCheckInput) {
        res.redirect("/cadastro?error=error")
        return
    }
    await userDao.setData(data)
    res.redirect("/")
})

router.post("/login", async (req, res) => {
    const data = req.body
    const [rows] = await userDao.getData(data)
    if (!rows) {
        res.redirect("/?error=error")
        return;
    }
    req.session.user = {
        id: rows.id,
        username: rows.username
    }
    res.redirect(`/user/${req.session.user.username}`)
})

module.exports = router