var Controller = {

}


function testCtrl($scope) {

}

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

app.controller('sequencerCtrl', function ($scope, $location, $http, $resource) {
    console.log("this is not supposed to work");
    alert(newsong);
    init(newsong.doc._id);
})


/*
Controller.start();*/
