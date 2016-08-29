import express from 'express'
import routes from './routes'
import pug from 'pug'
import path from 'path'

const server = express()

server.listen(process.env.PORT || 3000)

//view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

//user routes
server.use('/', routes)
server.get('/', (req,res) => {
  res.send('hello auto deployed world')
})
