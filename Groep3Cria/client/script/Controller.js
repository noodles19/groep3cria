var Controller = {
    login: new Login(),
    start: function () {

        this.login.loginMain();
    },

    checkCredentials: function () {
        return this.view.checkCredentials();


    }
}

function HomeCtrl($scope) {
    console.log("Home");
}

function DetailCtrl($scope) {
    console.log("detail");
}

function DefaultCtrl($scope, $location) {
    $scope.GoToNext2 = function (hash) {
        console. slog("go to " + hash);
        $location.path(hash);
    }
}

Controller.start();