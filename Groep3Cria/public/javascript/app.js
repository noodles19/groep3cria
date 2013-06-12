var app = angular.module('myApp', ['ngResource'])

// Declare app level module which depends on filters, and services
app.config(['$routeProvider', function ($routeProvider) {
        // Cars
        $routeProvider.when('/Home', {
            templateUrl: 'partials/home.html',
            controller: loginCtrl
        });
        $routeProvider.when('/Learn', {
            templateUrl: 'partials/learn.html',
            controller: testCtrl
        });
        $routeProvider.when('/MySongs', {
            templateUrl: 'partials/mySongs.html',
            controller: testCtrl
        });
        $routeProvider.when('/Friends', {
            templateUrl: 'partials/friends.html',
            controller: friendsCtrl
        });
        $routeProvider.when('/Register', {
            templateUrl: 'partials/registerForm.html',
            controller: 'registerCtrl'
        });

        $routeProvider.otherwise({ redirectTo: '/Home' });

    }]
    );
