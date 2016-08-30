import express from 'express';

const router = express.Router()

router.get('/', (request, response) => {
  response.render('index')
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
  }
})

router.get('/login', (request, response) => {

  response.render('users/login', {

  })
})

router.get('/logout', (request, response) => {

  response.render('homepage', {

  })
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