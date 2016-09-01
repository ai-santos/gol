const databaseName = 'goldb'
const connectionString = process.env.DATABASE_URL || `postgres://${process.env.USER}@localhost:5432/${databaseName}`
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
    user_id=$1
  ORDER BY
    rank DESC
  `

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

const updateTodo = (attributes) => {
  // return db.one( updateTodoSQL(), [ title, id ] )
  const sql = `
    UPDATE
      todos
    SET
      title=$2,
      completed=$3
    WHERE
      id=$1
  `
  const variables = [
    attributes.id,
    attributes.title,
    !!attributes.completed
  ]
  return db.none(sql, variables)
}

const deleteTodoSQL = () =>
  `DELETE FROM
    todos
  WHERE
    todos.id=$1`

const deleteTodo = (id) => {
  return db.none( deleteTodoSQL(), [ id ])
}

const swapTodoRanks = function(todoA, todoB){
  const sqlA = `
    UPDATE
      todos
    SET
      rank=$2
    WHERE
      id=$1
  `
  const variablesA = [todoA.id, todoB.rank]

  const sqlB = `
    UPDATE
      todos
    SET
      rank=$2
    WHERE
      id=$1
  `
  const variablesB = [todoB.id, todoA.rank]

  return Promise.all([
    db.none(sqlA, variablesA),
    db.none(sqlB, variablesB),
  ])

}

const moveTodo = function(direction, userId, todoId){
  return getAllTodosByUserId(userId)
    .then(todos => {
      const todoA = todos.find(todo => todo.id === todoId)
      const oldRank = todoA.rank
      const newRank = oldRank + direction
      const todoB = todos.find(todo => todo.rank === newRank)
      return swapTodoRanks(todoA, todoB)
    })
}
const moveTodoUp = function(userId, todoId){
  return moveTodo(1, userId, todoId)
};
const moveTodoDown = function(userId, todoId){
  return moveTodo(-1, userId, todoId)
}

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
  createTodo,
  markTodoCompleteSQL,
  markTodoComplete,
  markTodoIncompleteSQL,
  markTodoIncomplete,
  updateTodoSQL,
  updateTodo,
  moveTodoUp,
  moveTodoDown,
  deleteTodoSQL,
  deleteTodo
}
