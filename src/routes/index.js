import express from 'express';
import database from '../database'
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10)
const router = express.Router()


router.use( (request, response, next) => {
  request.session.lastLogin = (new Date).toString()
  request.session.requestCount++;
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
  newUser.encrypted_password = encryptPassword(newUser.password)
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
  var auth = request.body.user

  database.authenticateUser(auth.email)
    .then(user => {
      if (user && matchPasswords(auth.password, user.encrypted_password)){
        request.session.userId = user.id
        response.redirect('dashboard')
      } else {
        response.status(400).render('users/login', {
          error: 'Bad email or password'
        })
      }
    })
    .catch(renderError(response))
})

router.get('/dashboard', (request, response) => {
  const userId = request.session.userId
  if (userId){
    Promise.all([
      database.getUserById(userId),
      database.getAllTodosByUserId(userId)
      ])
    .then(results => {
      const currentUser = results[0]
      const todos = results[1]

      response.render('users/dashboard', {
        currentUser: currentUser,
        todos: todos,
      })
    })
    .catch(renderError(response))
  } else {
    response.redirect('/')
  }
})

router.post('/todos', (request, response) => {
  const userId = request.session.userId
  if (!userId){
    response.redirect('/')
    return
  }
  const title = request.body.title || ''
  database.createTodo(userId, title)
    .then(() => {
      response.redirect('/dashboard')
    })
    .catch(renderError(response))
})

router.post('/todos/:todoId', (request, response) => {
  const todoId = request.params.todoId
  const attributes = request.body.todo || {}
  attributes.id = todoId
  database.updateTodo(attributes)
    .then(() => {
      response.redirect('/dashboard')
    })
    .catch(renderError(response))
})

const renderError = function(response){
  return function(error){
    response.status(500).render('error',{
      error: error
    })
  }
}

const encryptPassword = function(password){
  return bcrypt.hashSync(password, salt)
}

const matchPasswords = function(password, encrypted_password){
  return bcrypt.compareSync(password, encrypted_password)
}

module.exports = router
