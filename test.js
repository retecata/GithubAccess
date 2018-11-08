const octokit = require('@octokit/rest')()
var http = require('http');

var github_data;
octokit.repos.getForOrg({
  org: 'octokit',
  type: 'public'
}).then(({ data, headers, status }) => {
   github_data = JSON.stringify(data)
})

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(github_data)
}).listen(8080);
