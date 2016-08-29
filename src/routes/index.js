import express from 'express';

const router = express.Router()

router.get('/signup', (request, response) => {

  response.render('users/signup', {

  })
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