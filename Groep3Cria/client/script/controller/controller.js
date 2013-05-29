function HomeCtrl($scope) {
    console.log("Home");
}

function DetailCtrl($scope) {
    console.log("detail");
}

function DefaultCtrl($scope,$location) {
    $scope.GoToNext2 = function (hash) {
        console.log("go to "+hash);
        $location.path(hash);
    }
}