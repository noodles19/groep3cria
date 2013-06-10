// Declare app level module which depends on filters, and services
angular.module('myApp', [ 'myApp.services']).
    config(['$routeProvider', function ($routeProvider) {
        // Cars
        $routeProvider.when('/Home', {
            templateUrl: './partials/home.html',
            controller: testCtrl
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
            controller: testCtrl
        });
        $routeProvider.when('/Register', {
            templateUrl: 'partials/registerForm.html',
            controller: testCtrl
        });
        $routeProvider.when('/employees', {
            templateUrl: 'partials/local-employees.html',
            controller: localCtrl
        });
        $routeProvider.when('/transactions/new/:carId/:price', {
            templateUrl: 'partials/transaction-form.html',
            controller: TransactionNewCtrl
        });

        $routeProvider.otherwise({ redirectTo: '/Home' });

    }]
    );