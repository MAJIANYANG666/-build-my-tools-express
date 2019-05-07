var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

var router = {
  '/getData': function(req, res){
      //把url转换成对象
      //第二个参数等于true时，该方法返回的URL对象中，
      //query字段不再是一个字符串，而是一个经过querystring模块转换后的参数对象
      var pathObj = url.parse(req.url, true)

      var page = pathObj.query.page
      var result

      if(page == 1){
       result = [1,2,3]
      }
      if(page == 2){
        result = [4,5,6]
      }
      
      res.write(JSON.stringify(result))
      res.end()    
  },
  '/hello': function(req, res){
    res.end('hello world')
  } 
}


var server = http.createServer(function(req, res){
  //静态路径
  var staticPath = path.join(__dirname, 'www')
  // 对象
  var pathObj = url.parse(req.url, true)
  // 文件路径
  var filePath = path.join(staticPath, pathObj.pathname)
  try{
    //单字节编码
    //NodeJS中自带了一种binary编码可以用来实现这个方法
    var fileContent = fs.readFileSync(filePath,'binary')
    res.write(fileContent, 'binary')
    res.end()
  }catch(e){
    //文件名
    if(router[pathObj.pathname]){
      router[pathObj.pathname](req, res)
    }else{
      res.writeHead(404, 'not found')
      res.end('not found')      
    }
  }

})

server.listen(8080)
