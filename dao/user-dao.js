const con = require('./database')

async function setData(data) {
    let sql = "INSERT INTO User SET ?"
    let values = {
        username: data.usernameInput,
        password: data.passwordInput
    }
    const [rows] = await con.query(sql, values)
    return rows
}

async function getData(args) {
    if (args) {
        let sql = "SELECT id, username FROM User WHERE username = ? and password = ?"
        let values = {
            username: args.usernameInput,
            password: args.passwordInput
        }
        const [rows] = await con.query(sql, [values.username, values.password])
        return rows
    }
    let sql = "SELECT * FROM User"
    const [rows] = await con.query(sql)
    return rows
}

async function updateData(username, id){
    let sql = "UPDATE User SET ? WHERE id = ?"
    let values = {
        username: username
    }
    await con.query(sql, [values, id])
}

async function deleteData(id) {
    let sql = "DELETE FROM User WHERE id = ?"
    const [rows] = await con.query(sql, id)
}

module.exports = {
    setData,
    getData,
    updateData,
    deleteData
}