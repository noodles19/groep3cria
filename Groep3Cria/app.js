

/**
 * Module dependencies.
 */
var express = require('express')
    , fs = require('fs')
    , http = require('http')
    , path = require('path')
    , routes = require('./routes');

// Load configuration
var env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env];

// Bootstrap db connection
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file)
})

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var passport = require('passport')
    , flash = require('connect-flash')
    , LocalStrategy = require('passport-local').Strategy;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 33001);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    //  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    app.use(allowCrossDomain);  // CORS middleware
    app.use(app.router);
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

/*
 * ===== BUG in Node.js ======
 * This will occur when testing.
 * By default EventEmitters will print a warning if more than 10 listeners are added for a particular event.
 * This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10.
 * This function allows that to be increased. Set to zero for unlimited.
 * http://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
 */
app.setMaxListeners(0);

app.configure('development', function () {
    app.use(express.errorHandler());
});

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var mongoose = require('mongoose')
    , passwordHash = require('password-hash')
    , Relation = mongoose.model('Relation');

passport.deserializeUser(function (id, done) {
    Relation.findOne({ _id: id }, function (err, doc) {
        if (err) {
            return done(err);
        }
        if (!doc) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        // Create user object
        var user = {};
        user.username = doc.name;
        user.email = doc.email;

        return done(err, user);
    });

});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    console.log('serializing');
    console.log('done:', done);
    if (user && user.id) {
        done(null, user.id);
    } else {
        user = {};
        user.id = 0;

        done(null, user.id);
    }
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('passport.use(new LocalStrategy');
        Relation.findOne({ name: username }, function (err, doc) {
            var hashedPassword = "";
            if (doc && doc.password) {
                hashedPassword = doc.password;
            }
            console.log("hashedPassword: ", hashedPassword);
            console.log("doc: ", doc);
            console.log("err: ", err);
            console.log("password: ", password);
            console.log("passwordHash.verify(password, hashedPassword): ", passwordHash.verify(password, hashedPassword));
            console.log("done): ", done);
            // Verify given password (or empty string) with stored password
            // @see https://github.com/davidwood/node-password-hash/blob/master/README.md
            if (password === "" || !passwordHash.verify(password, hashedPassword)) {
                console.log('xxxx 1');
                doc = {};
                return done(err);
            }

            if (err) {
                console.log('xxxx 2');
                return done(err);
            }
            if (!doc) {
                console.log('xxxx 3');
                return done(null, false, { message: 'Incorrect username.' });
            }
            console.log('returning...');
            return done(null, doc);
        });
    }
));

// Routes
app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});

app.get('/login', function (req, res) {
    res.render('login', { user: req.user, message: req.flash('error') });
});

app.get("/myLogin", function (req, res) {
    var isVerified;
    isVerified = false;
    if (req.user && req.user !== null) {
        isVerified = true;
    }


    //res.redirect("#/admin/cars");
    //
    var retObj = {
        meta: {"action": "get myLogin", 'timestamp': new Date()},
        isVerified: isVerified
    };
    return res.send(retObj);
});

app.post('/myLogin',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}),
    function (req, res) {
        var retObj = {
            meta: {"action": "post myLogin", 'timestamp': new Date()},

            isVerified: true
        };
        return res.send(retObj);
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Bootstrap routes
app.get('/restDemo', routes.restDemo);

// static page
app.get('/specRunner.html', function (req, res) {
    res.sendfile(__dirname + '/public/jasmine/specRunner.html');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

// Bootstrap routes
require('./routes/routes.js')(app, passport);

// Last line to serve static page
app.use(express.static(__dirname + '/public'));
