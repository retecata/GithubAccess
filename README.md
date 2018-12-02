# Github Data Visualization
This project is part of CS3012 Coursework, Trinity College Dublin.
The aim is to interrogate the Github API and fetch data that could be useful in elucidating aspects of the software engineer process. The course requires the data to be used in some sort of visualization.

## Technologies used
1. React
2. D3
3. Node.js
4. NPM

### [React](https://reactjs.org/)
React is a declarative, component-based JavaScript library used for building interfaces.
I used React both for the frontend and fetching the data, with the built-in fetch command.

### [D3](https://d3js.org/)
D3 is another JavaScript library. It's used to build interactive, dynamic web visualization.
I used this library to create a Force-Directed Graph.

### [Node.js](https://nodejs.org/en/)
Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.
I used Node.js for the GithubAccess part of the assignment. I started using it in order to fetch the data. I was planning to save this data in MongoDb, but eventually I realized having a database didn't make much sense for my project. I can only simply pull data in React, so I decided to give up on Node.js. Not to mention that using Node.js and React would've required me to learn several other technologies, and I am already new to React and D3.

### [NPM](https://www.npmjs.com/)
npm is a package manager for the JavaScript programming language. I used this on Linux to download all the required packages and to start the React application.
