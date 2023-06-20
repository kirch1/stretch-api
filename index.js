const express = require('express');
const bodyParser = require('body-parser');
const { getUsers, getResources, addLearning } = require('./queries');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Stretch backend' })
});

app.get('/users', getUsers);
app.get('/resources', getResources);
app.post('/addlearning', addLearning);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
