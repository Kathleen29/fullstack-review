const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {
    type: Number,
    unique: true
  },
  repo_name: String,
  repo_url: String,
  repo_description: String,
  user: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (newRepos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  newRepos.forEach(repo => {
    var gitRepo = new Repo({
      repo_id: repo.id,
      repo_name: repo.name,
      repo_url: repo.html_url,
      repo_description: repo.description,
      user: repo.owner.login,
      forks: repo.forks
    });
    gitRepo.save((err) => {
      if(err) return err;
    })
  })
  callback();
}

let querydb = (callback) => {
  return Repo.
  find().
  limit(25).
  sort('-forks').
  exec(callback);
};

module.exports = {
  save,
  querydb
}