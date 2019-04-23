const express = require('express')
require('dotenv').config()
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const SwagCtrl = require('./controllers/swagController')
const AuthCtrl = require('./controllers/authController')
const CartCtrl = require('./controllers/cartController')
const SearchCtrl = require('./controllers/searchController')

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));
//swag
app.get('/api/swag', SwagCtrl.read )
//auth
app.post(`/api/login`, AuthCtrl.login)
app.post('/api/register', AuthCtrl.register)
app.post('/api/signout', AuthCtrl.signout)
app.get('/api/user', AuthCtrl.getUser)
//cart
app.post('/api/cart/checkout', CartCtrl.checkout)
app.post('/api/cart/:id', CartCtrl.add)
app.delete('/api/cart/:id', CartCtrl.delete)
//search
app.get('/api/search', SearchCtrl.search )

app.listen(SERVER_PORT, () => {console.log(`if you are quiet you can hear port ${SERVER_PORT}`)})