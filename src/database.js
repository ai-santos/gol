eewdconst databaseName = 'goldb'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')()
const db = pgp(connectionString)

//CREATE A NEW USER

const createUser = function (attributes) {
  const sql = 
  `INSERT INTO
      users (email, encrypted_password, created_at)
    VALUES
      ($1, $2, now())
    RETURNING
      *`
  const variables = [
    attributes.email,
    attributes.encrypted_password
  ]

  return db.one(sql, variables)
}

//AUTHENTICATE USER

const authenticateUser = function (email) {
  const sql = 
  `SELECT 
      *
    FROM
      users
    WHERE 
      email=$1
    LIMIT
      1`
  const variables = [
    email,
  ]

  return db.oneOrNone(sql, variables)
}


//GET USER BY ID

const getUserByIdSQL = () =>
  `SELECT 
    * 
  FROM 
    users 
  WHERE 
    id=$1`

const getUserById = userId => {
  return db.one( getUserByIdSQL(), [userId] )
}

//GET ALL TO-DO'S BY USER ID

const getAllTodosByUserIdSQL = () =>
  `SELECT 
    * 
  FROM 
    todos 
  WHERE 
    user_id=$1`

const getAllTodosByUserId = userId => {
  return db.any( getAllTodosByUserIdSQL(), [userId] )
}

//GET ALL COMPLETED TO-DO'S BY USER

const getAllCompletedTodosByUserIdSQL = () =>
  `SELECT 
    * 
  FROM 
    todos 
  WHERE 
    user_id=$1 
  AND 
    completed=true`

const getAllCompletedTodosByUserId = userId => {
  return db.any( getAllCompletedTodosByUserIdSQL(), [userId])
}

//GET ALL INCOMPLETE TO-DO'S BY USER

const getAllIncompleteTodosByUserIdSQL = () =>
  `SELECT * 
  FROM 
    todos 
  WHERE 
    user_id=$1 
  AND 
    completed=false`

const getAllIncompleteTodosByUserId = userId => {
  return db.any(getAllIncompleteTodosByUserIdSQL(), [userId])
}

//CREATE TO-DO

const createTodoSQL = () =>
  `INSERT INTO 
    todos (user_id, title, completed, created_at, rank)
  VALUES 
    ($1, $2, false, now(), $3)
  RETURNING 
    *`

const createTodo = (userId, title) => {
  return getFinalRank(userId).then(rank => {
    const sql = `
      INSERT INTO
        todos (user_id, title, completed, created_at, rank)
      VALUES 
        ($1, $2, false, now(), $3)
      RETURNING 
        *
    `
    const variables = [
      userId, 
      title,
      rank
    ]
    return db.one(sql, variables)
  })

}

//GET FINAL RANK

const getFinalRankSQL = () => 
  `SELECT 
    MAX(rank)+1 as rank 
  FROM 
    todos 
  WHERE 
    user_id=$1`

const getFinalRank = (userId) => {
  return db.one( getFinalRankSQL(), [ userId ]).then(row => row.rank || 0)
}

//MARK TO-DO AS COMPLETE

const markTodoCompleteSQL = () =>
  `UPDATE
    todos
  SET
    completed = true
  WHERE
    id=$1`

const markTodoComplete = (id) => {
  return db.one( markTodoCompleteSQL(), [ id ])
}

//CHANGE TO-DO STATUS TO INCOMPLETE

const markTodoIncompleteSQL = () =>
  `UPDATE
    todos
  SET
    completed = false
  WHERE
    todos.id=$1`

const markTodoIncomplete = (id) => {
  return db.one( markTodoIncompleteSQL(), [ id ])
}

//UPDATE TO-DO (TITLE ONLY)

const updateTodoSQL =() =>
  `UPDATE
    todos
  SET
    todos.title = $1
  WHERE
    todos.id=$2`

const

//CHANGE RANK

const changeTodoRankSQL = () =>
  `UPDATE
    todos
  SET
    rank = (rank)+1 || (rank)-1
  WHERE
    todos.id=$1`

//DELETE TODO

const deleteTodoSQL = () =>
  `DELETE FROM
    todos
  WHERE
    todos.id=$1`



markTodoComplete(1).then( data => console.log(data))

markTodoIncomplete(1).then( data => console.log(data))

updateTodo(1).then( data => console.log(data))

changeTodoRank(1).then( data => console.log(data))

markTodoComplete(1).then( data => console.log(data))



export default { 
  getUserByIdSQL,
  getUserById,
  getAllTodosByUserIdSQL,
  getAllTodosByUserId,
  getAllCompletedTodosByUserIdSQL,
  getAllCompletedTodosByUserId,
  getAllIncompleteTodosByUserIdSQL,
  getAllIncompleteTodosByUserId,
  createUser,
  authenticateUser,
  getFinalRankSQL,
  getFinalRank,
  createTodoSQL,
  createTodo
}
