const express = require('express')
require('dotenv').config()
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const SwagCtrl = require('./controllers/swagController')
const AuthCtrl = require('./controllers/authController')

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)

app.get('/api/swag', SwagCtrl.read )
app.post(`/api/login`, AuthCtrl.login)
app.post('/api/register', AuthCtrl.register)
app.post('/api/signout', AuthCtrl.signout)
app.get('/api/user', AuthCtrl.getUser)

app.listen(SERVER_PORT, () => {console.log(`if you are quiet you can hear port ${SERVER_PORT}`)})