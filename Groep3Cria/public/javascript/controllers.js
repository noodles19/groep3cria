var Controller = {
    register: new Register(),
    login: new Login(),

    start: function () {
        this.register.registerForm();
        this.login.loginMain();
    },

    checkCredentials: function () {
        return this.view.checkCredentials();


    }
}


/*
function songsCtrl($scope, Songs) {
    $scope.songs = Songs;

}
*/

function testCtrl($scope, local) {

}

function friendsCtrl($scope, $location, $routeParams, friendsModel){
    $scope.err = ""; // Initialize err as empty string. We start with no errors.
    $scope.get = function () {

        $scope.loginName = $routeParams.loginName;
        $scope.displayName = $routeParams.displayName;
        $scope.email = $routeParams.email;


        console.log(friendsModel);
        friendsModel.get({}, $scope.friendsForm, function (res) {
            if (res.err === null) {
                $location.path("/Friends");
                console.log("succesfull");
            } else {
                $scope.err = res.err.err;
                console.log("error");
            }
        });
    };
}

/*app.controller('loginCtrl',function($scope, $location, $http, $resource) {
    var User = $resource('http://autobay.tezzt.nl\\:',{},
        {charge: {method:'POST', params:{charge:true}}}
    );

    var user = new User($scope.user);
    user.$save(function(data) {

    })


})
*/
function loginCtrl($scope, $location, $http, $resource, loginModel){
    $scope.err = ""; // Initialize err as empty string. We start with no errors.
    $scope.get = function () {
        console.log(loginModel);
        loginModel.save({}, $scope.loginForm, function (res) {

            if (res.result.loginName === $scope.user.username) {
                $location.path("/Home");
                console.log("succesfull");
            } else  {
                $scope.err = res.err.err;
                console.log("error");
            }
        });
    };
}




function registerCtrl($scope, $location, usersModel) {
    $scope.err = ""; // Initialize err as empty string. We start with no errors.
    $scope.save = function () {
        console.log(123);
        console.log($scope.userForm);
        console.log(usersModel);
        usersModel.save({}, $scope.userForm, function (res) {
            if (res.err === null) {
                $location.path("/Register");
            } else {
                $scope.err = res.err.err;
            }
        });
    };
}

Controller.start();