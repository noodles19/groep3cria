angular.module('myController',[]).
    config(function($routeProvider) {
        $routeProvider.
            when('/home', {controller:HomeCtrl, templateUrl:'http://localhost:8888/test.html'}).
            when('/detail', {controller:DetailCtrl, templateUrl:'http://localhost:8888/details.html'}).
            otherwise({redirectTo:'/'});

        // YQL
        $routeProvider.when('/yql', {
            templateUrl: 'partials/countries.html',
            controller: YQLCtrl
        });
    });
