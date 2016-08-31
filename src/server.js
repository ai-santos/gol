import express from 'express'
import routes from './routes'
import pug from 'pug'
import path from 'path'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import logger from 'morgan'
import serveFavicon from 'serve-favicon'


const server = express()

//view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

// middleware
server.use(logger('dev'))
server.use(express.static(__dirname+'/public'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieSession({
  name: 'session',
  keys: [
    '8116ab0b6db1bc95124d0846905355988ebd4254', 
    'e37eb286cef14df95d61f2420d19f2a292147fcf'
  ]
}))


// routes
server.use('/', routes)


// leave this at the end
server.listen(process.env.PORT || 3000)
