app.controller('loginCtrl', function ($scope, $location, $http, $resource) {
    $scope.loginUser = function () {
        console.log($scope);

        var User = $resource('http://cria.tezzt.nl\\:43058/signin', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        var user = new User($scope.loginModel);

        user.$save(function (data) {

            if (data.error == null) {
                console.log("succesfull");
                $scope.loggedIn = true;
                $scope.profile = true;

            } else {
                console.log("error");
            }

        })


    };


    $scope.greeting = function (parent) {
        var divGreeting = document.createElement("div");
        divGreeting.setAttribute("id", "greeting");
        var greeting = document.createElement("h2");
        var form = document.getElementById("loginForm");
        greeting.appendChild(document.createTextNode("Welcome " + form.userid.value));
        divGreeting.appendChild(greeting);
        parent.appendChild(divGreeting);
    }


    $scope.logOut = function () {
        console.log("logout");
    }




})