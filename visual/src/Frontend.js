import React, { Component } from 'react'
import './App.css'
import Graph from './Graph'
class Frontend extends Component {
  constructor(props) {
    super(props);
    this.state = {user: 'tensorflow', repo: 'tensorflow',numbers: [], users: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  fetch(){
    var contributors_name = [];
    var number_contributions = [];
    var endpoint = 'https://api.github.com/repos/'+ this.state.user + '/'+this.state.repo + '/contributors'
    console.log(endpoint)
    fetch(endpoint)
      .then(res => res.json())
      .then(json =>{
        json.forEach((contributor)=>{
          contributors_name.push(contributor.login);
          number_contributions.push(contributor.contributions)
        });
        this.setState({ numbers:number_contributions,users:contributors_name })
      });
  }

  componentDidMount(){
    this.fetch()
  }

  handleChange (evt) {
     this.setState({ [evt.target.name]: evt.target.value });
   }

   handleSubmit(event) {
    this.fetch()
    alert('An essay was submitted: ' + this.state.user +" "+ this.state.repo);
    event.preventDefault();
  }

  renderForm(){
    return(
      <form onSubmit = {this.handleSubmit}>

        <label> Enter User </label>
        <input type="text" name="user" onChange={this.handleChange} />

        <label> Enter Repo </label>
        <input type="text" name="repo" onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
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
export default Frontend
