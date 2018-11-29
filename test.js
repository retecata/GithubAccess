const octokit = require('@octokit/rest')()
var http = require('http');

var github_data;


octokit.repos.getContent({
  owner: 'retecata',
  repo: 'CS3012',
  path: ''
}).then(({ data, headers, status }) => {
  console.log(data);
   github_data = JSON.stringify(data)
})

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(github_data)
}).listen(8080);
