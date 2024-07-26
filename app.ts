var http = require ('http')

http.createServer(function(req,res) {
    res.write("welcome back srikanth")
    res.end()
}).listen(8080)

