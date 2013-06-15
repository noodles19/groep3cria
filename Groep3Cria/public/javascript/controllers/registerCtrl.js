app.controller('registerCtrl', function ($scope, $location, $http, $resource) {
    console.log("test")
    $scope.registerUser =function(){
        console.log("test1")
        var User = $resource('http://cria.tezzt.nl\\:43058/user', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        console.log($scope.userForm);
        var user = new User($scope.userForm);
        user.$save(function (data) {
            console.log(data);
        })
    }
})
