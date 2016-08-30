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

export default { 
  createUser
}