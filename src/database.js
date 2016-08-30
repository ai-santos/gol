const databaseName = 'goldb'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

const createUser = function (attributes) {
  const sql = `
    INSERT INTO
      users (email, encrypted_password, created_at)
    VALUES
      ($1, $2, now())
    RETURNING
      *
  `
  const variables = [
    attributes.email,
    attributes.password
  ]

  return db.one(sql, variables)
}

const authenticateUser = function (attributes) {
  const sql = `
    SELECT 
      *
    FROM
      users
    WHERE 
      email=$1
    AND
      encrypted_password=$2
    LIMIT
      1
  `
  const variables = [
    attributes.email,
    attributes.password
  ]

  return db.oneOrNone(sql, variables)
}


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
  // let finalRank = getFinalRank()
  return db.one( createTodoSQL(), [ userId, title, rank])
}

// const getFinalRank = () => {
//   `SELECT LAST(rank) `
// }

//MARK TO-DO AS COMPLETE



//UNMARK TO-DO AS COMPLETE



//UPDATE TO-DO



//DELETE TO-DO

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

getAllIncompleteTodosByUserId(1).then( data => console.log(data))

export default { 
  getUserByIdSQL,
  getUserById,
  getAllTodosByUserIdSQL,
  getAllTodosByUserID,
  getAllCompletedTodosByUserIdSQL,
  getAllCompletedTodosByUserId,
  getAllIncompleteTodosByUserIdSQL,
  getAllIncompleteTodosByUserId,
  createUser,
  authenticateUser
}
