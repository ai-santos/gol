const databaseName = 'goldb'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

const getUserByIdSQL = () =>
  `SELECT * FROM users WHERE id=$1`

const getUserById = userId => {
  return db.one( getUserByIdSQL(), [userId] )
}

const getAllTodosByUserIdSQL = () =>
  `SELECT * FROM todos WHERE user_id=$1`

const getAllTodosByUserID = userId => {
  return db.any( getAllTodosByUserIdSQL(), [userId] )
}

const getAllCompletedTodosByUserIdSQL = () =>
  `SELECT * FROM todos WHERE user_id=$1 AND completed=true`

const getAllCompletedTodosByUserId = userId => {
  return db.any( getAllCompletedTodosByUserIdSQL(), [userId])
}

getAllCompletedTodosByUserId(1).then( data => console.log(data))

//
// --getAllCompletedTodosByUserId
// SELECT * FROM todos WHERE user_id=1 AND completed=true;
//
// --getAllIncompleteTodosByUserId
// SELECT * FROM todos WHERE user_id=1 AND completed=false;

module.exports = {
  getUserByIdSQL, getUserById, getAllTodosByUserIdSQL, getAllTodosByUserID, getAllCompletedTodosByUserIdSQL, getAllCompletedTodosByUserId
}
