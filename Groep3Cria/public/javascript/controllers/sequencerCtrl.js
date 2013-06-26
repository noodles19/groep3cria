app.controller('sequencerCtrl', function ($scope, $location, $http, $resource, $routeParams) {
    var Song = $resource('http://cria.tezzt.nl\\:43058/song/' + $routeParams.id, {},
        {charge: {method: 'GET', params: {charge: true}}}
    );
    init($routeParams.id);
})