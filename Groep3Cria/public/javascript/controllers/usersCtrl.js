
app.controller('usersCtrl', function ($scope, $location, $http, $resource, $routeParams) {
    $scope.searchUser =function(){
        var User = $resource('http://localhost\\:33001/users', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );
        var user = User.get(function(data){
            console.log(data);
            $scope.users=data;
        });
    }


    $scope.getUser = function() {
        var id = $routeParams.id;
        var User = $resource('http://localhost\\:33001/user' + id,{},
            {charge: {method:'GET', params:{charge:true}}}
        );
        var user = User.get(function(data){
            $scope.users = data.songs;

        });
    };

})