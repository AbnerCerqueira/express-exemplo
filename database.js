const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function setData(data) {
    let sql = "INSERT INTO User SET ?"

    let values = {
        username: data.usernameInput,
        password: data.passwordInput
    }

    const [result] = await con.query(sql, values)
    return result
}
exports.setData = setData

async function getData(args) {
    if (args) {
        let sql = "SELECT * FROM User WHERE username = ? and password = ?"
        let values = {
            username: args.usernameInput,
            password: args.passwordInput
        }
        const [result] = await con.query(sql, [values.username, values.password])
        return result
    }

    let sql = "SELECT * FROM User"
    const [result] = await con.query(sql)
    return result
}
exports.getData = getData

async function updateData(username, id){
    let sql = "UPDATE User SET ? WHERE id = ?"
    let values = {
        username: username
    }
    await con.query(sql, [values, id])
}
exports.updateData = updateData

async function deleteData(id) {
    let sql = "DELETE FROM User WHERE id = ?"
    const [result] = await con.query(sql, id)
}
exports.deleteData = deleteData