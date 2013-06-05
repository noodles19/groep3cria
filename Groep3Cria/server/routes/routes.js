function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

module.exports = function (app) {



    /*  User routes
     ---------------
     We create a variable "relations" that holds the controller object.
     We map the URL to a method in the created variable "relations".
     In this example is a mapping for every CRUD action.
     */
    var users = require('../app/controllers/users.js');
    // CREATE
    app.post('/user/', users.create);
    // RETRIEVE
    app.get('/users', users.list);
    app.get('/user/:email', users.detail);
    // UPDATE
    app.put('/user/:email', users.update);
    // DELETE
    app.delete('/user/:email', users.delete);
    // ADMIN
    app.post('/admin/login', users.login);





}