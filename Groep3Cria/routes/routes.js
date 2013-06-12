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
    app.post('/songs/', songs.create);
    // RETRIEVE
    app.get('/songs', songs.list);
    app.get('/song/:name', songs.listSingleSong);
    // UPDATE
    app.put('/songs/', songs.update);
    // DELETE
    app.delete('/songs/', songs.delete);
}