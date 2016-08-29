import express from 'express';

const router = express.Router()

router.get('/signup', (request, response) => {

  response.render('users/signup', {})
})

const renderError = function(response){
  return function(error){
    response.status(500).render('error',{
      error: error
    })
  }
}

module.exports = router