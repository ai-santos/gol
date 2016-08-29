import express from 'express'

const server = express()

server.get('/', (req,res) => {
  res.send('hello world')
})


server.listen(process.env.PORT || 3000)