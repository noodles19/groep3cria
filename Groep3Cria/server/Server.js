/**
 * User: mdkr
 * Date: 3/23/13
 */

function Server() {
    var self = this;

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
        socket.on("saveNewPlayer", function (data) {

            var mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost/groep3cria');

            var song = mongoose.model('song', { name: String, club: String, playerNumber: Number, isSuspended: Boolean });

            var rody = new song({ name: data.name, club: data.club, playerNumber: data.playerNumber, isSuspended: false });
            rody.save(function (err) {
                console.log('done');
            });
        });
    }
}

var server = new Server();
server.start();