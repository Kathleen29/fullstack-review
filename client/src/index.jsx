import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (data) => {
        this.setState({
          repos: data
        })
      }
    })
  }

  onChange() {
    $.ajax({
      type: 'GET',
      url: '/repos',
      success: (data) => {
        this.setState({
          repos: data
        })
      }
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: 'POST',
      url: '/repos',
      contentType: 'application/json',
      dataType: 'text',
      data: JSON.stringify({username: term}),
      success: (data) => {
        this.onChange();
      },
      error: (err) => {
        console.log("Error in adding repos");
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));