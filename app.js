const path = require('path')
const express = require('express')
const session = require('express-session')
const cookies = require('cookie-parser')
const methodOverride = require('method-override')
const cors = require('cors')
require('dotenv').config()

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js')
const { errorHandler } = require('./middlewares/error/errorHandler.js')

const APP_PORT = process.env.APP_PORT || 80
const APP_URL = process.env.APP_URL || 'http://localhost'

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.resolve('./public')))
app.use(
  session({
    secret: 'secret-horizonx',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(cookies())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(userLoggedMiddleware)
app.use(express.json())
app.use(cors())

const webRoutes = require('./routers/web/index.routes.js')
const apiV1Routes = require('./routers/api/v1/index.routes.js')
const apiV2Routes = require('./routers/api/v2/index.routes.js')

app.use(webRoutes)
app.use('/api/v1', apiV1Routes)
app.use('/api/v2', apiV2Routes)

app.use(errorHandler)
app.use('*', webRoutes)

app.listen(APP_PORT, () => {
  console.log(`Server running... ${APP_URL}:${APP_PORT}`)
})

module.exports = app