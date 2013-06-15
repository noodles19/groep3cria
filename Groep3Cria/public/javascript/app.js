var app = angular.module('myApp', ['ngResource'])

// Declare app level module which depends on filters, and services
//angular.module('myApp', [ 'myApp.services']).
    app.config(['$routeProvider', function ($routeProvider) {
        // Cars
        $routeProvider.when('/Home', {
            templateUrl: 'partials/home.html',
            controller: 'loginCtrl'
        });
        $routeProvider.when('/Learn', {
            templateUrl: 'partials/learn.html',
            controller: testCtrl
        });
        $routeProvider.when('/MySongs', {
            templateUrl: 'partials/mySongs.html',
            controller: 'songCtrl'
        });
        $routeProvider.when('/MySongs/:id', {
            templateUrl: 'partials/song.html',
            controller: 'songCtrl'
        })
        $routeProvider.when('/Friends', {
            templateUrl: 'partials/friends.html',
            controller: 'usersCtrl'
        });
        $routeProvider.when('/Register', {
            templateUrl: 'partials/registerForm.html',
            controller: 'registerCtrl'
        });
        $routeProvider.when('/New', {
            templateUrl: 'partials/newsong.html',
            controller: 'newSongCtrl'
        });
        $routeProvider.when('/Sequencer', {
            templateUrl: 'partials/sequencer.html',
            controller: 'newSongCtrl'
        });
        $routeProvider.when('/NewMessage', {
            templateUrl: 'partials/newMessage.html',
            controller: 'newMsgCtrl'
        })
=======
        $routeProvider.when('/Contact', {
            templateUrl: 'partials/contact.html',
            controller: 'testCtrl'
        });
        $routeProvider.when('/termsOfUse', {
            templateUrl: 'partials/termsOfUse.html',
            controller: 'testCtrl'
        });
        $routeProvider.when('/Disclaimer', {
            templateUrl: 'partials/disclaimer.html',
            controller: 'testCtrl'
        });

>>>>>>> Stashed changes
        $routeProvider.otherwise({ redirectTo: '/Home' });
    }]
);
