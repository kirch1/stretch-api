const Pool = require('pg').Pool

const pool = new Pool({
  user: 'stretch_admin',
  host: 'localhost',
  database: 'stretch',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getResources = (request, response) => {
  pool.query('SELECT * FROM resources', (error, results) => {
    if(error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const addLearning = (request, response) => {
  const {user_id, resource_id, progress} = request.body;
  pool.query(
    "INSERT INTO learning (user_id, resource_id) VALUES ($1,$2) RETURNING *",
    [user_id, resource_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  getResources,
  addLearning
}
