import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table id='repolist'>
      <tbody>
        <tr>
          <th>Repo</th>
           <th>User</th>
           <th>Forks</th>
        </tr>
        {props.repos.map(repo => {
          return (
            <tr key={repo.repo_id}>
            <td><a href={repo.repo_url}>{repo.repo_name}</a></td>
            <td>{repo.user}</td>
            <td>{repo.forks}</td>
          </tr>
          )
        })}
    </tbody>
  </table>
  </div>
)

export default RepoList;