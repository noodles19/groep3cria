
app.controller('usersCtrl', function ($scope, $location, $http, $resource, $routeParams) {
    $scope.searchUser =function(){
        var User = $resource('http://cria.tezzt.nl\\:43058/users', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );
        var user = User.get(function(data){
            console.log(data);
            $scope.users=data;
        });
    }


    $scope.getUser = function() {
        var id = $routeParams.id;
        var User = $resource('http://autobay.tezzt.nl\\:43058/user' + id,{},
            {charge: {method:'GET', params:{charge:true}}}
        );
        var user = User.get(function(data){
            $scope.users = data.songs;

        });
    };

})