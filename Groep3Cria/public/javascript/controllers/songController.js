app.controller('songCtrl', function ($scope, $location, $http, $resource, $routeParams) {

    $scope.searchSong = function () {
        var Song = $resource('http://localhost\\:33001/songs', {},
            {charge: {method: 'GET', params: {charge: true}}}
        );
        var songs = Song.get(function (data) {
            console.log(data);
            $scope.songs = data;
        });
    }


    $scope.getSong = function () {
        console.log($routeParams.id);
        var id = $routeParams.id;

        var Song = $resource('http://localhost\\:33001/song/' + id, {},
            {charge: {method: 'GET', params: {charge: true}}}
        );
        var songs = Song.get(function (data) {
            $scope.song = data.songs;

        });
    };

    $scope.addRating = function (rating) {
        var songPage = document.getElementById("songPage");
        var like = document.getElementById("like");
        var dislike = document.getElementById("dislike");
        var h = document.createElement("h2");
        h.setAttribute("class","alert")
        if (rating == 'like') {
            console.log('liked');
            h.innerHTML = "You liked";
            $(".alert").fadeOut(3000);
            like.disabled = true;
            dislike.disabled = true;



        }
        else {
            console.log('disliked');

            dislike.disabled = true;
            like.disabled = true;
            h.innerHTML = "You disliked";
        }
        songPage.appendChild(h);

    };

    $scope.inviteFriends = function () {
        var songPage = document.getElementById("songPage");
        var inviteUser = document.createElement("button");
        var text = document.createElement("input");
        var h = document.createElement("h2");
        h.setAttribute("class","alert");
        text.setAttribute("type", "text");
        text.setAttribute("placeholder", "Username");

        inviteUser.onclick = function () {
            inviteUser.disabled = true;
            console.log("you invited a user");
            h.innerHTML = "You invited a user";
            $(".alert").fadeOut(5000);

        }
        inviteUser.innerHTML = "invite";

        songPage.appendChild(text);
        songPage.appendChild(inviteUser);
        songPage.appendChild(h);

    }
    /*
     $scope.addRating = function(value) {
     if(window.sessionStorage['loggedInUser'] !== undefined){
     var Ratings = $resource('http://cria.tezzt.nl\\:43058/songs/:id/ratings', {id: '@song'},
     {charge: {method:'POST', params:{charge:true}}}
     );

     var user = JSON.parse(window.sessionStorage['loggedInUser']);

     var ratings = {
     user:       user._id,
     song: $scope.songs._id,
     amount:     +value
     };

     var rating = new Ratings(ratings);
     rating.$save(function(data) {
     if(data.error === null){
     console.log("rating succesfull")
     } else {
     console.log("rating niet succesfull")
     }
     });
     } else {
     console.log("je moet ingelogd zijn om te stemmen")
     }
     };

     */
    /**
     * This function will post an comment to the server that wil save it. It's also directly showed on the website.
     */
    /*
     $scope.addComment = function() {
     if(window.sessionStorage['loggedInUser'] !== undefined){
     var Comments = $resource('http://cria.tezzt.nl\\:43058/songs/:id/comments', {id: '@song'},
     {charge: {method:'POST', params:{charge:true}}}
     );

     var user = JSON.parse(window.sessionStorage['loggedInUser']);

     var comment = {
     user:       user._id,
     song: $scope.songs._id,
     comment:    $scope.comment
     };

     var comment = new Comments(comment);
     comment.$save(function(data) {
     if(data.result !== null){
     data.result.user = user;
     $scope.comments.push(data.result);
     Application.notify('ok', 'Commentaar succesvol geplaatst.');
     } else {
     Application.notify('error', 'Commentaar is niet opgeslagen, probeer opnieuw.');
     }
     });
     } else {
     Application.notify('error', 'Je moet ingelogd zijn om te reageren.');
     }
     };*/
})