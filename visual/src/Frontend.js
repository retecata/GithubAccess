import React, { Component } from 'react'
import './App.css'
import Graph from './Graph'


class Frontend extends Component {
  constructor(props) {
    super(props);
    this.state = {user: 'tensorflow', repo: '',numbers: [], users: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  fetch(){
    if (this.state.repo!==''){
    var contributors_name = [];
    var number_contributions = [];
    var endpoint = 'https://api.github.com/repos/'+ this.state.user + '/'+this.state.repo + '/contributors'
    console.log(endpoint)
    fetch(endpoint)
      .then(res => res.json())
      .then(json =>{
        json.forEach((contributor)=>{
          contributors_name.push("User: " + contributor.login);
          number_contributions.push(contributor.contributions)
        });
        this.setState({ numbers:number_contributions,users:contributors_name })
      }).catch(function() {
        alert('Wops! Something went wrong! Make sure the user and repo provided are correct!');
      });
    }else{
      //look for repos and commits
      var repos = []
      var commits = []
      var endpoint = 'https://api.github.com/users/'+this.state.user+'/repos'
      console.log(endpoint)
      fetch(endpoint)
        .then(res => res.json())
        .then(json =>{
          console.log(json)
          json.forEach((repo)=>{
            repos.push("Repo: " + repo.name);
            commits.push(repo.size)
          });
          this.setState({ numbers:commits,users:repos })
        }).catch(function() {
          alert('Wops! Something went wrong! Make sure the user and repo provided are correct!');
        });

    }
  }

  componentDidMount(){
    this.fetch()
  }

  handleChange (evt) {
     this.setState({ [evt.target.name]: evt.target.value });
   }

   handleSubmit(event) {
    this.fetch()
    event.preventDefault();
  }

  renderForm(){
    return(
      <div style={styles.form}>
        <form onSubmit = {this.handleSubmit}>
          <label> Enter User </label>
          <input type="text" name="user" onChange={this.handleChange} />

          <label> Enter Repo </label>
          <input type="text" name="repo" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  render() {
    const { numbers } = this.state
    const { users }   = this.state

    if (numbers.length !==0) {
      return(
        <div>
          {this.renderForm()}
         <Graph data={numbers} contributors = {users} />
         </div>
       );
    } else {
      return(
        <div>
          {this.renderForm()}
          <span>Loading chart..</span>
        </div>
      );
    }

  }
}

const styles = {
  form:{
    margin: '0 auto',
    width: '80%',
    borderRadius: '5px',
    boxShadow: '7px 7px 10px grey',
    textAlign: 'center',
    border: '1px solid #ffa64d',
    padding: '10px',
    backgroundColor: '#ffcc99',
  }
}

export default Frontend
