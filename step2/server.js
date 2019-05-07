//自己写
var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

//路由
var routers = {
  '/a': function(req, res){
    res.end(JSON.stringify(req.query))
    //自己造数据，这里用了请求的数据
  },

  '/b': function(req, res){
    res.end('match /b')
  },
  
  '/a/c': function(req, res){
    res.end('match /a/c')
  },

  '/search': function(req, res){
    res.end('username'+req.body.username+',passname='+req.body.password)
  }
}


var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )



function routePath(req,res){
  var pathObj = url.parse(req.url, true)
  var handleFn = routers[pathObj.pathname]
  if(handleFn){
    //get请求，数据放在url里面
    req.query = pathObj.query
    //post请求,数据放在body里面
    //post请求,监听d到ata的时候会执行回调，将数据加给body，后面同理
    var body = ''
    // req的on api
    req.on('data', function(chunk){
      body +=chunk
    }).on('end',function(){
      req.body = parseBody(body)
      handleFn(req, res)
    })
    
  }else{
    staticRoot(path.resolve(__dirname, 'static'), req, res)
  }
}


function staticRoot(staticPath, req, res){
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath,'binary', function(err, content){
    if(err){
      res.writeHead('404', 'haha Not Found')
      return res.end()
    }

    res.writeHead(200, 'Ok')
    res.write(content, 'binary')
    res.end()  
  })

}

//解析body字符串变成一个对象
function parseBody(body){
  console.log(body)
  var obj = {}
  // body
  // username=aaa&password=bbb
  //split &再split =
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}






