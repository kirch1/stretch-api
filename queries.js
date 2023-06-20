const Pool = require("pg").Pool;

const pool = new Pool({
  user: "stretch_admin",
  host: "localhost",
  database: "stretch",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getResources = (request, response) => {
  const { tags } = request.body;
  let query = "SELECT * FROM resources";
  const args = [];
  if(tags.length) {
    query = "SELECT * FROM resources WHERE ";
    tags.forEach((tag, i) => {
      args.push(tag);
      query += `$${i+1} ILIKE ANY(tags)`
      if(i < tags.length - 1) {
        query += " AND "
      }
    });
  }
  console.log(query);
  pool.query(query, args, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getComments = (request, response) => {
  const resource_id  = request.params.resource_id;
  pool.query(
    "SELECT * FROM comments WHERE resource_id = $1",
    [resource_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addResource = (request, response) => {
  const { creator_id, title, description, link, tags } = request.body;
  pool.query(
    "INSERT INTO resources (creator_id, title, description, link, tags) VALUES ($1,$2,$3,$4,$5) RETURNING *",
    [creator_id, title, description, link, tags],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json(results.rows);
    }
  );
};

const addComment = (request, response) => {
  const { user_id, resource_id, comment } = request.body;
  pool.query(
    "INSERT INTO comments (user_id, resource_id, comment) VALUES ($1,$2,$3) RETURNING *",
    [user_id, resource_id, comment],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const addLearning = (request, response) => {
  const { user_id, resource_id } = request.body;
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
  getComments,
  addResource,
  addComment,
  addLearning,
};
