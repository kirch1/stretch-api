const express = require('express');
const bodyParser = require('body-parser');
const { getUsers, getResources, addLearning, addResource, getComments, addComment } = require('./queries');
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
app.post('/resources', getResources);
app.get('/comments/:resource_id', getComments);
app.post('/comments', addComment);
app.post('/resources', addResource);
app.post('/learning', addLearning);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});
