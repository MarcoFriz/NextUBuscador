var http            = require('http'),
    express         = require('express')

var port  					= process.env.PORT || 8090,
	  app							= express(),
    Server					= http.createServer(app),
    api             = require("./Api")


app.use(express.static('public'))
app.use("/api",api)

Server.listen(port, function(){
  console.log("Server is running on port: " + port)
})
