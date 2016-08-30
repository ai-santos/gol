import express from 'express'
import routes from './routes'
import pug from 'pug'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import logger from 'morgan'
import serveFavicon from 'serve-favicon'


const server = express()

//view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

// middleware
server.use(logger('dev'))
server.use(bodyParser.json())
server.use(express.static(__dirname+'/public'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'SOMERANDOMSECRETHERE', 
  cookie: { maxAge: 6000}
}))


// routes
server.use('/', routes)


// leave this at the end
server.listen(process.env.PORT || 3000)
