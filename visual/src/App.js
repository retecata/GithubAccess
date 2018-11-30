import React, { Component } from 'react'
import './App.css'
import GithubData from './GithubData'
class App extends Component {
   render() {
   return (
      <div className='App'>
      <div className='App-header'>
      <h2>d3ia dashboard</h2>
      </div>
      <div>
      <GithubData/>
      </div>
      </div>
   )
   }
}
export default App
