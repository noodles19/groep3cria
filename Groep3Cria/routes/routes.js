function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

module.exports = function (app) {

    var users = require('../app/controllers/users.js');
    // CREATE
    app.post('/user/', users.create);
    // RETRIEVE
    app.get('/users', users.list);
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