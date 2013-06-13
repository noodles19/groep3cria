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
        $routeProvider.when('/Friends', {
            templateUrl: 'partials/friends.html',
            controller: 'testCtrl'
        });
        $routeProvider.when('/Register', {
            templateUrl: 'partials/registerForm.html',
            controller: 'registerCtrl'
        });

        $routeProvider.otherwise({ redirectTo: '/Home' });

    }]
    );
