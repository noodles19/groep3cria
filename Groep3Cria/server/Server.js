/**
 * User: mdkr
 * Date: 3/23/13
 */

function Server() {
    var self = this;

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/groep3cria');

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

var server = new Server();
server.start();
