"use strict";

angular.module('myApp.services', ['ngResource'])
    // Requires a local autobay app
    .factory('db', ['$resource', '$http',
        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'remove': {method: 'DELETE'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            db.cars = $resource('/cars/:id', {}, actions);
            return db;
        }
    ])

    .factory('local', function () {
        var items = [
            {'name': 'Home'},
            {'name': 'Transaction'}

        ];
        return {
            get: function (callback) {
                return items;
            }
        }
    })


;


