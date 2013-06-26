app.controller('registerCtrl', function ($scope, $location, $http, $resource) {
    $scope.registerUser = function () {
        var User = $resource('http://cria.tezzt.nl\\:43058/user', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        console.log($scope.userForm);
        var user = new User($scope.userForm);
        user.$save(function (data) {
            console.log(data);
        })

        var register = document.getElementById("register");
        var p = document.createElement("p");
        p.innerHTML = "Bedankt voor het registreren!";
        register.appendChild(p);
        document.getElementById("registerForm").reset();
    }
})
