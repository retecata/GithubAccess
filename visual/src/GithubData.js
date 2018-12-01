import React, { Component } from 'react'
import './App.css'
import Graph from './Graph'
class GithubData extends Component {
  constructor(props) {
    super(props);
    this.state = {numbers: []};
  }

  componentDidMount() {
      var contributors_name = [];
      var number_contributions = [];
      fetch('https://api.github.com/repos/tensorflow/tensorflow/contributors')
        .then(res => res.json())
        .then(json =>{
          json.forEach((contributor)=>{
            contributors_name.push(contributor.login);
            number_contributions.push(contributor.contributions)
          });
          this.setState({ numbers:number_contributions })
        });
   }

  renderChart(){
    return
  }

  render() {
    const { numbers } = this.state
    console.log(numbers)
    console.log(numbers.length)
    if (numbers.length !==0) {
      return <Graph data={numbers} />
    } else {
      return   <span>Loading chart..</span>
    }

  }
}
export default GithubData
