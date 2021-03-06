const express = require('express');
let app = express();
let getRepos = require('../helpers/github');
let query = require('../database/index');
let saveRepo = require('../database/index');

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var repos = getRepos.getReposByUsername({username: req.body.username}, (data) => {
    saveRepo.save(data, () => {
      res.sendStatus(201);
    });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  query.querydb((err, results) => {
    if (err) throw err;
    res.send(results);
  })
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

