const path = require('path')
const express = require('express')
const session = require('express-session')
const cookies = require('cookie-parser')
const methodOverride = require('method-override')
const cors = require('cors')
require('dotenv').config()

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware.js')
const authMiddleware = require('./middlewares/authMiddleware')

const APP_PORT = process.env.APP_PORT || 80
const APP_URL = process.env.APP_URL || 'http://localhost'

const app = express()

app.listen(APP_PORT, () => {
  console.log(`Server running... ${APP_URL}:${APP_PORT}`)
})

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

const mainRoutes = require('./routers/main.routes')
const usersRoutes = require('./routers/users.routes')
const productsRoutes = require('./routers/products.routes')
const cartRoutes = require('./routers/cart.routes.js')

const apiProductsRoutes = require('./routers/api/productsAPI.routes.js')
const apiProductImageRoutes = require('./routers/api/productImageAPI.routes.js')
const apiCategoriesRoutes = require('./routers/api/categoriesAPI.routes.js')
const apiUsersRoutes = require('./routers/api/userAPI.routes.js')
const apiColorsRoutes = require('./routers/api/colorsAPI.routes.js')
const apiBrandsRoutes = require('./routers/api/brandsAPI.routes.js')
const apiAuthRoutes = require('./routers/api/auth.routes.js')

app.use('/', mainRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/cart', authMiddleware, cartRoutes)

app.use('/api/products', apiProductsRoutes)
app.use('/api/productImages', apiProductImageRoutes)
app.use('/api/categories', apiCategoriesRoutes)
app.use('/api/users', apiUsersRoutes)
app.use('/api/colors', apiColorsRoutes)
app.use('/api/brands', apiBrandsRoutes)
app.use('/api/auth', apiAuthRoutes)

app.use('*', mainRoutes)
