
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