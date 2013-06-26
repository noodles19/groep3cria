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
    app.get('/users', authenticated, users.list);
    app.get('/user/:email', users.detail);
    // UPDATE
    app.put('/user/update', users.update);
    // DELETE
    app.delete('/user/:email', users.delete);
    // ADMIN
    app.post('/admin/login', users.login);


    var songs = require('../app/controllers/songs.js');
    // CREATE
    app.post('/songs', authenticated, songs.create);
    // RETRIEVE
    app.get('/songs', authenticated, songs.list);
    app.get('/song/:id', authenticated, songs.listSingleSong);
    // UPDATE
    app.post('/updatesong', songs.update);
    // DELETE
    app.delete('/songs/', songs.delete);


    var privatemessages = require('../app/controllers/messages.js');
    // CREATE
    app.post('/privatemessages', authenticated, privatemessages.create);
    // RETRIEVE
    app.get('/privatemessages/:receiverid', authenticated, privatemessages.list);
    app.get('/privatemessage/:id', authenticated, privatemessages.listSingleMessage);
    // UPDATE
    app.put('/privatemessages/', authenticated, privatemessages.update);
    // DELETE
    app.delete('/privatemessages/', authenticated, privatemessages.delete);
}