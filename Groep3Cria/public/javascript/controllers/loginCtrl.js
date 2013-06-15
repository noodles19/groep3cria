app.controller('loginCtrl', function ($scope, $location, $http, $resource) {
    $scope.loginUser =function(){
        var User = $resource('http://cria.tezzt.nl\\:43058/signin', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        console.log($scope.loginModel);
        var user = new User($scope.loginModel);
        user.$save(function (data) {
            alert("gewooon iets");
            console.log("scope "+$scope.user);
            console.log("data "+data.result.loginName)
            /*if (data.result.loginName === $scope.user.username) {
             console.log("succesfull");
             } else {
             $scope.err = res.err.err;
             console.log("error");
             }*/
        })
    }

})