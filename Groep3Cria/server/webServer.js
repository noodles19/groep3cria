
//http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8888;


function Server() {
    var self = this;

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/Musync');

    var User = mongoose.model('User', { displayName: String, loginName: String, email: String, password: String });

    /**
     * Starts a static http connection on port 8000 and a websocket server on 1337
     */
    this.start = function () {
        // Socket.io is used for handling dynamic requests (JSON)
        var connect = require("connect"),
            io = require("socket.io").listen(1337);
        // Due to our folder structure we need to add /../ before accessing the client folder that serves as
        // document root and web root
        connect().use(connect.static(__dirname + "/../client")).listen(8000);

        io.sockets.on("connection", function (socket) {
            self.handleSocketConnection(socket);
        });
    }

    /**
     * We implement a simple protocol that listens to savePlayer request with a JSON payload
     * @param socket
     */
    this.handleSocketConnection = function (socket) {
        socket.on("saveNewUser", function (data) {
            var users = new User({ displayName: data.displayName, loginName: data.loginName, email: data.email, password: data.password});
            users.save(function (err) {
                console.log('done');
            });
        });


    }

    /*  this.handleSocketConnection = function (socket) {
     socket.on("checkLoginForm", function (data, callbackfn) {
     console.log(data);
     User.findOne({ displayName: data.userid}, function (err, users) {
     callbackfn(users);

     });
     });
     }*/
}

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

    console.log(filename);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };

  path.exists(filename, function(exists) {
    if(!exists) {
        console.log(filename);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += 'index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      var headers = {'Access-Control-Allow-Origin': '*',
		     'Access-Control-Allow-Headers': 'X-Requested-With'};
      var contentType = contentTypesByExtension[path.extname(filename)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

var server = new Server();
server.start();

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");