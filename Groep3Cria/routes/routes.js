/**
 * Ensure that the route is only called when authenticated.
 * If it's not the case it will return a response for authentication.
 * @param {Object} req The request made.
 * @param {Object} res The response object.
 * @param {Function} next The next function (The destination controller action).
 */
function authenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    return res.send({
        "error": "U moet zich eerst authenticeren voordat u deze actie mag uitvoeren",
        "result": null
    });
}

module.exports = function (app) {

    var users = require('../app/controllers/users.js');
    // CREATE
    app.post('/user', users.create);
    // RETRIEVE
    app.get('/users'/*, authenticated*/, users.list);
    app.get('/user/:email', users.detail);
    // UPDATE
    app.put('/user/update', users.update);
    // DELETE
    app.delete('/user/:email', users.delete);
    // ADMIN
    app.post('/admin/login', users.login);


    var songs = require('../app/controllers/songs.js');
    // CREATE
    app.post('/songs', songs.create);
    // RETRIEVE
<<<<<<< Updated upstream
    app.get('/songs/', songs.list);
    app.get('/song/:id', songs.listSingleSong);
=======
    app.get('/songs', songs.list);
    app.get('/song/:name', songs.listSingleSong);
    /*app.get('/song/:id', songs.listSong);*/
>>>>>>> Stashed changes
    // UPDATE
    app.put('/songs/', songs.update);
    // DELETE
    app.delete('/songs/', songs.delete);

    var privatemessages = require('../app/controllers/messages.js');
    // CREATE
    app.post('/privatemessages', privatemessages.create);
    // RETRIEVE
    app.get('/privatemessages/:receiverid', privatemessages.list);
    app.get('/privatemessage/:id', privatemessages.listSingleMessage);
    // UPDATE
    app.put('/privatemessages/', privatemessages.update);
    // DELETE
    app.delete('/privatemessages/', privatemessages.delete);
}