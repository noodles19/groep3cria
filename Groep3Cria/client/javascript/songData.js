var myApp = angular.module('myApp', []);
myApp.factory('Songs', function () {
    var Songs = {};
    Songs.testarray =
        [
            {
                author: 1,		//Author ID
                name: 'Remember me',
                speed: 60,
                volume: 100,
                instrument: [
                    {
                        type: "Guitar",
                        notes: [
                            {pitch: 1.0,
                                position: 0},
                            {pitch: 1.0,
                                position: 1}
                        ]
                    },
                    {
                        type: "Piano",
                        notes: [
                            {pitch: 1.0,
                                position: 0},
                            {pitch: 1.0,
                                position: 1}
                        ]
                    }
                ],
                Comments: [
                    {
                        UserID: 2,
                        Comment: "THIS IS GREAT."
                    },
                    {
                        UserID: 3,
                        Comment: "THIS IS AMAZING."
                    }
                ],
                Ratings: [
                    {
                        UserID: 1,
                        rating: "Like"
                    },
                    {
                        UserID: 2,
                        rating: "Like"
                    },
                    {
                        UserID: 3,
                        rating: "Dislike"
                    }
                ],
                based_on: null
            },
           {
                author: 2,
                name: 'Remember me v2',
                speed: 60,
                volume: 100,
                instrument: [
                    {
                        type: "Drums",
                        notes: [
                            {pitch: 1.0, position: 0},
                            {pitch: 1.0, position: 1}
                        ]
                    },
                    {
                        type: "Piano",
                        notes: [
                            {pitch: 1.0, position: 2},
                            {pitch: 1.0, position: 3}
                        ]
                    }
                ],
                Comments: [
                    {
                        UserID: 2,
                        Comment: "THIS IS GREAT."
                    }
                ],
                based_on: 1
            },
            {
                author: 3,
                name: 'Remember me v3',
                speed: 60,
                volume: 100,
                instrument: [
                    {
                        type: "Guitar",
                        notes: [
                            {pitch: 1.0, position: 2},
                            {pitch: 1.0, position: 3}
                        ]
                    },
                    {
                        type: "Piano",
                        notes: [
                            {pitch: 1.0, position: 4},
                            {pitch: 1.0, position: 5}
                        ]
                    }
                ],
                comments: [
                    {
                        UserID: 1,
                        Comment: "THIS IS GOOD."
                    }
                ],
                based_on: 2
            }
        ]
    return Songs;
});

function songsCtrl($scope, Songs) {
    $scope.songs = Songs;

}
