import express from 'express';
import database from '../database'

const router = express.Router()

router.use( (request, response, next) => {
  request.loggedIn = 'userId' in request.session
  response.locals.loggedIn = request.loggedIn
  next()
})

router.get('/', (request, response) => {
  response.render('index', {
    session: request.session
  })
})

router.get('/signup', (request, response) => {
  response.render('users/signup',{
    newUser: {}
  })
})

router.post('/signup', (request, response) => {
  const newUser = request.body.user
  if (newUser.password && newUser.password !== newUser.password_confirmation){
    response.render('users/signup', {
      error: 'passwords do not match',
      newUser: newUser,
    })
    return
  } 
  database.createUser(newUser)
    .then(user => {
      request.session.userId = user.id
      response.redirect('/')
    })
    .catch(renderError(response))
})

router.get('/login', (request, response) => {
  const email = request.session.email
  response.render('users/login', {
  })
})

router.get('/logout', (request, response) => {
  delete request.session.userId
  response.redirect('/')
})

router.post('/login', (request, response) => {

  database.authenticateUser(request.body.user)
    .then(user => {
      if (user){
        request.session.userId = user.id
        response.redirect('/')
      } else {
        response.status(400).render('users/login', {
          error: 'Bad email or password'
        })
      }
    })
    .catch(renderError(response))
})

router.get('/dashboard', (request, response) => {

  response.render('users/dashboard', {

  })
})

const renderError = function(response){
  return function(error){
    response.status(500).render('error',{
      error: error
    })
  }
}

module.exports = router
