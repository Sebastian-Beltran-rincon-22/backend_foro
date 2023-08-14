const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

//Code line to fix warning Query's more stricts
mongoose.set('strictQuery', true);

const publicationsRouters = require('./routers/publications')

const port = 3010
const app = express();

app.use(express.json())
app.use('/api/publications', publicationsRouters)


app.get('/', (req, res) => {
    res.send('Holaa!! Estas conenctado a la API del Foro')
})


app.listen(port, () => {
    console.log('Listening on url ' + 'http://www.localhost:' + port)
})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conected to DB'))
    .catch((error) => console.log(error))