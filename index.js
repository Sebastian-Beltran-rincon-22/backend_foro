const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const port = 3010
const app = express();


app.get('/', (req, res) => {
    res.send('Holaa!! Estas conenctado a la API del Foro')
})


app.listen(port, () => {
    console.log('Listening on url ' + 'http://www.localhost:' + port)
})