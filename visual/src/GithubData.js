import React, { Component } from 'react'
import './App.css'
import BarChart from './BarChart'
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

      /*  console.log(contributors_name);
        console.log(number_contributions)
        this.setState({numbers:number_contributions}, function () {
          console.log(this.state.numbers);
          this.forceUpdate();
        });
    /*fetch('http://localhost:8000/api/Books')
      .then(data => data.json())
      .then((data) => { this.setState({ books: data }) });*/
   }

  renderChart(){
    return
  }

  render() {
    const { numbers } = this.state
    console.log(numbers)
    console.log(numbers.length)
    if (numbers.length !==0) {
      return <BarChart data={numbers} size={[500,500]} />
    } else {
      return   <span>Loading chart..</span>
    }

  }
}
export default GithubData
