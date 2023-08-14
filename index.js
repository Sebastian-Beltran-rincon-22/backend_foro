
const app = require('./app')
const dataBase = require('./database')


const port = 3000()
app.listen(port)
console.log('server listen on port', port)


