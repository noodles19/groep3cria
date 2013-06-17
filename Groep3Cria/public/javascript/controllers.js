
function testCtrl($scope) {

}

app.controller('sequencerCtrl', function ($scope, $location, $http, $resource, $routeParams) {
    var Song = $resource('http://localhost\\:33001/song/' + $routeParams.id, {},
        {charge: {method: 'GET', params: {charge: true}}}
    );
    init($routeParams.id);
})

app.controller('newSongCtrl', function ($scope, $location, $http, $resource) {
    $scope.startNewSong =function(){
        var Song = $resource('http://localhost\\:33001/songs', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        var song = new Song($scope.songForm);
        song.$save(function (data) {
            alert("Sequencer/" + data.doc._id);
            $location.path("Sequencer/" + data.doc._id);
        });
    }
})

app.controller('newMsgCtrl', function ($scope, $location, $http, $resource) {
    $scope.sendNewMessage =function(){
        var Message = $resource('http://localhost\\:33001/privatemessages', {},
            {charge: {method: 'POST', params: {charge: true}}}
        );
        var message = new Message($scope.messageForm);
        message.$save(function (data) {
            console.log(data);
        });
    }
})


/*
Controller.start();*/
