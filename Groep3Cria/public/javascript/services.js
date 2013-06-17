"use strict";

angular.module('myApp.services', ['ngResource'])
    // Requires a local autobay app
    .factory('usersModel', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            db = $resource('/user', {}, actions);
            return db;
        }
    ])

    .factory('friendsModel', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            db = $resource('/admin/login/:loginName/:password', {}, actions);
            return db;
        }
    ])
    .factory('loginModel', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            db = $resource('/admin/login/:loginName/:password', {}, actions);
            return db;
        }
    ])
;


