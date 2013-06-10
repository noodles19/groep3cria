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

function testCtrl($scope, local) {

}
function localCtrl($scope, local) {
    $scope.employees = local.get();
}


function TransactionNewCtrl($scope, $routeParams, $location, Transaction) {
    $scope.carId = $routeParams.carId;
    $scope.price = $routeParams.price;
    $scope.minPrice = parseFloat($routeParams.price, 10) * 0.8;
    $scope.err = ""; // Initialize err as empty string. We start with no errors.

    $scope.save = function () {
        Transaction.save({}, $scope.transaction, function (res) {
            if (res.err === null) {
                $location.path("/cars");
            } else {
                $scope.err = res.err.err;
            }
        });
    };

    $scope.getInitialValueForCarId = function () {
        return $routeParams.carId;
    };
}


Controller.start();