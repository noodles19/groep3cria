app.controller('loginCtrl', function ($scope, $location, $http, $resource) {
    $scope.loginUser =function(){
        var User = $resource('http://cria.tezzt.nl\\:43058/signin', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        console.log($scope.loginModel);
        var user = new User($scope.loginModel);
        user.$save(function (data) {

            if (data.error=null) {
             console.log("succesfull");
             } else {

             console.log("error");
             }
        })
    }

})