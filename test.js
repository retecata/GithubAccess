const octokit = require('@octokit/rest')()
var http = require('http');
const https = require('https');
const request = require('request');
const endpoint = 'https://api.github.com';
const fetch = require('node-fetch');

var github_data;
fetch('https://api.github.com/repos/tensorflow/tensorflow/contributors')
    .then(res => res.json())
    .then(json =>
      json.forEach((contributor)=>{
        console.log(contributor.login);
        console.log(contributor.contributions);
      }));

/*http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(github_data)
}).listen(8080);*/
