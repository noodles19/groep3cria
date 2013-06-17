
function testCtrl($scope) {

}

var newsong =null;

app.controller('newSongCtrl', function ($scope, $location, $http, $resource) {
    if(newsong != null)
    {
        init(newsong._id);
        newsong = null;
    }
    else
    {
        $scope.startNewSong =function(){
            var Song = $resource('http://localhost\\:33001/songs', {},
                {charge: {method: 'POST', params: {charge: true}}}
            );
            var song = new Song($scope.songForm);
            song.$save(function (data) {
                newsong = data.doc;
                $location.path("Sequencer");
            });
        }
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
