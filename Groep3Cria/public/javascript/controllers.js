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


function testCtrl($scope) {

}

/*function friendsCtrl($scope, $location, $routeParams, friendsModel) {
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
}*/


app.controller('songCtrl', function ($scope, $location, $http, $resource) {
    $scope.searchSong =function(){
        var Song = $resource('http://cria.tezzt.nl\\:43058/songs', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );
        var songs = Song.get(function(data){
            console.log(data);
           $scope.songs=data;
        });
    }

})


app.controller('loginCtrl', function ($scope, $location, $http, $resource) {
    $scope.loginUser =function(){
        var User = $resource('http://cria.tezzt.nl\\:43058/signin', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        console.log($scope.loginModel);
    var user = new User($scope.loginModel);
    user.$save(function (data) {
        console.log(data);

        /*if (data.result.loginName === $scope.user.username) {
            $location.path("/Home");
            console.log("succesfull");
        } else {
            $scope.err = res.err.err;
            console.log("error");
        }*/
    })
    }

})

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



Controller.start();