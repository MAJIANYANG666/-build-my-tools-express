
var http = require('http')
var server = http.createServer(function(request, response){
  // 白屏测试
    setTimeout(function(){
      response.setHeader('Content-Type','text/html')
      response.writeHead(404,'Not Found')
      response.write('<html><head><meta charset="utf-8" /></head>')
      response.write('<body>')
      response.write('<h1>你好</h1>')
      response.write('</body>')
      response.write('</html>')
      response.end()
    },20000 )
})

console.log('open http://localhost:8080')
server.listen(8080)