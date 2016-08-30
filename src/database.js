const databaseName = 'goldb'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

//GET USER BY ID

const getUserByIdSQL = () =>
  `SELECT * 
  FROM users 
  WHERE id=$1`

const getUserById = userId => {
  return db.one( getUserByIdSQL(), [userId] )
}

//GET ALL TO-DO'S BY USER ID

const getAllTodosByUserIdSQL = () =>
  `SELECT * 
  FROM todos 
  WHERE user_id=$1`

const getAllTodosByUserID = userId => {
  return db.any( getAllTodosByUserIdSQL(), [userId] )
}

//GET ALL COMPLETED TO-DO'S BY USER

const getAllCompletedTodosByUserIdSQL = () =>
  `SELECT * 
  FROM todos 
  WHERE user_id=$1 
  AND completed=true`

const getAllCompletedTodosByUserId = userId => {
  return db.any( getAllCompletedTodosByUserIdSQL(), [userId])
}

//GET ALL INCOMPLETE TO-DO'S BY USER

const getAllIncompleteTodosByUserIdSQL = () =>
  `SELECT * 
  FROM todos 
  WHERE user_id=$1 
  AND completed=false`

const getAllIncompleteTodosByUserId = userId => {
  return db.any(getAllIncompleteTodosByUserIdSQL(), [userId])
}

//CREATE TO-DO

const createTodoSQL = () =>
  `INSERT INTO todos (user_id, title, completed, created_at, rank)
  VALUES ($1, $2, false, now(), $3)
  RETURNING *`

const createTodo = (userId, title, rank) => {
  let finalRank = getFinalRank(userId)
  return db.one( createTodoSQL(), [ userId, title, rank])
}

//GET FINAL RANK

const getFinalRankSQL = () => 
  `SELECT rank FROM todos WHERE user_id=$1 ORDER BY rank DESC LIMIT 1`

const getFinalRank = (userId) => {
  return db.one( getFinalRankSQL(), [ userId ])
}

//MARK TO-DO AS COMPLETE



//UNMARK TO-DO AS COMPLETE



//UPDATE TO-DO



//DELETE TO-DO


getFinalRank(1).then( data => console.log(data))

// getAllIncompleteTodosByUserId(1).then( data => console.log(data))

// getAllIncompleteTodosByUserId(1).then( data => console.log(data))

// getAllIncompleteTodosByUserId(1).then( data => console.log(data))

// getAllIncompleteTodosByUserId(1).then( data => console.log(data))

// getAllIncompleteTodosByUserId(1).then( data => console.log(data))


module.exports = {
  getUserByIdSQL, getUserById, getAllTodosByUserIdSQL, getAllTodosByUserID, getAllCompletedTodosByUserIdSQL, getAllCompletedTodosByUserId, getAllIncompleteTodosByUserIdSQL, getAllIncompleteTodosByUserId
}
