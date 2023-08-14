const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()



app.use(cors({
    origin:"*",
    methods:"GET,HEAD,POST,PATCH,PUT,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const admin = require ('./routers/admin')
app.use('/admin',admin)

module.exports = app