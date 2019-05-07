
var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

function staticRoot(staticPath, req, res){
    var pathObj = url.parse(req.url, true)//解析

    if(pathObj.pathname === '/'){//不写index.html直接跳转
      pathObj.pathname += 'index.html' 
    }

    var filePath = path.join(staticPath, pathObj.pathname)
    // 不健壮使用异步
    // var fileCintent = fs.readFileSync(filePath, 'binary')//二进制读取同步文件
    // res.write(fileCintent, 'binary')
    // res.end()
    // 异步
    fs.readFile(filePath, 'binary', function(err, fileCintent){
      if(err){
        console.log('404')
        res.writeHead(404,'not found')
        res.end('<h1>404 Not Found</h1>')
      }else{
        console.log('ok')
        res.writeHead(200, 'OK')
        res.write(fileCintent, 'binary')
        res.end()
      }
    })
    //还有一个content-type问题
}

console.log(__dirname)//目录路径
console.log(path.join(__dirname, 'static'))
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'static'), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080')