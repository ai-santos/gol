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

export default { 
  createUser,
  authenticateUser
}