/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 30-5-13
 * Time: 13:40
 * To change this template use File | Settings | File Templates.
 */
var sequencerRenderer = {
    stage: null,
    width: 2000,
    height: 2000,
    maxPosition: 0,
    instrumentLayers: [],
    isPlaying: false,
    numFrames: 0,
    time_step: 1,
    frame_scale: 1000 / 60,
    lastUpdate: null,
    bankLayer: null,
    markerLayer: null, //TODO remove and make an array of markers
    songs: [],
    songLength: 0,

    pitchToRect: [2.0, 1.5, 1, 0.667, 0.5],

    instruments: [
        {
            "instrumenttype": "Bass",
            "notes": [

            ],
            color: '#e60099'
        },
        { "instrumenttype": "Cymbal",
            "notes": [

            ],
            color: '#6633cc' },
        {  "instrumenttype": "Hi-hat",
            "notes": [

            ],
            color: '#00d0fa'},
        { "instrumenttype": "Snare",
            "notes": [

            ],
            color: '#0ba80b'},
        { "instrumenttype": "Kick",
            "notes": [

            ],
            color: '#80ff00'},
        { "instrumenttype": "Piano",
            "notes": [

            ],
            color: '#ffff00'},
        { "instrumenttype": "Clap",
            "notes": [

            ],
            color: '#e67a0f'
        },
        { "instrumenttype": "Pad",
            "notes": [

            ],
            color: '#ff0000'
        }
    ],

    instrumentnew: {
        "instrumenttype": "Orchestra Hit",
        "notes": [

        ]
    },

    song1: {
        "_id": "51b07731f61f961805000000",
        "author": {
            "_id": "51ac822bf61f96380a000001",
            "loginName": "Ersanio",
            "displayName": "Ersan",
            "email": "ersan_computeren@hotmail.com",
            "password": "gjyrwegt872trg7289uibgirg",
            "modificationDate": "2013-06-12T08:47:45.517Z"
        },
        "based_on": null,
        "comments": [
            {
                "UserID": {
                    "_id": "51ac822bf61f96380a000001",
                    "loginName": "Ersanio",
                    "displayName": "Ersan",
                    "email": "ersan_computeren@hotmail.com",
                    "password": "gjyrwegt872trg7289uibgirg",
                    "modificationDate": "2013-06-12T08:47:45.516Z"
                },
                "comment": "THIS IS GREATER."
            },
            {
                "UserID": {
                    "_id": "51ac8212f61f96380a000000",
                    "loginName": "Mike",
                    "displayName": "Mike",
                    "email": "etc@etc.etc",
                    "password": "gjyrwegt872trg7289uibgirg",
                    "modificationDate": "2013-06-12T08:47:45.507Z"
                },
                "comment": "THIS IS BETTER."
            }
        ],
        "instruments": [
            {
                "instrumenttype": "Distortion Guitar",
                "notes": [
                    {
                        "pitch": 1,
                        "position": 0,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 1,
                        "position": 1,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 2,
                        "position": 4,
                        "duration": 0.25,
                        "volume": 1
                    }
                ]
            }
        ],
        "name": "Remember me V2",
        "ratings": [
            {
                "UserID": {
                    "_id": "51ac822bf61f96380a000001",
                    "loginName": "Ersanio",
                    "displayName": "Ersan",
                    "email": "ersan_computeren@hotmail.com",
                    "password": "gjyrwegt872trg7289uibgirg",
                    "modificationDate": "2013-06-12T08:47:45.517Z"
                },
                "rating": "Like"
            },
            {
                "UserID": {
                    "_id": "51ac8212f61f96380a000000",
                    "loginName": "Mike",
                    "displayName": "Mike",
                    "email": "etc@etc.etc",
                    "password": "gjyrwegt872trg7289uibgirg",
                    "modificationDate": "2013-06-12T08:47:45.517Z"
                },
                "rating": "Dislike"
            }
        ],
        "speed": 60,
        "volume": 100
    },

    song3: {
        "_id": "51b07731f61f961805000000",
        "author": {
            "_id": "51ac822bf61f96380a000001",
            "loginName": "Ersanio",
            "displayName": "Ersan",
            "email": "ersan_computeren@hotmail.com",
            "password": "gjyrwegt872trg7289uibgirg",
            "modificationDate": "2013-06-12T08:47:45.517Z"
        },
        "based_on": null,
        "comments": [
        ],
        "instruments": [

        ],
        "name": "Remember me V2",
        "ratings": [
        ],
        "speed": 60,
        "volume": 100
    },


    song2: {
        "_id": "51ac8357f61f963c13000000",
        "author": "51ac822bf61f96380a000001",
        "based_on": null,
        "name": "Remember me",
        "speed": 20,
        "volume": 100,
        "ratings": [
            {
                "UserID": "51ac822bf61f96380a000001",
                "rating": "Like"
            },
            {
                "UserID": "51ac822bf61f96380a000000",
                "rating": "Dislike"
            }
        ],
        "instruments": [
            {
                "instrumenttype": "Xylophone",
                "notes": [
                    {
                        "pitch": 1,
                        "position": 0,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 1,
                        "position": 1,
                        "duration": 0.25,
                        "volume": 1
                    }
                ]
            },
            {
                "instrumenttype": "Piano",
                "notes": [
                    {
                        "pitch": 1,
                        "position": 0,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 1,
                        "position": 1,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 1,
                        "position": 2,
                        "duration": 0.25,
                        "volume": 1
                    },
                    {
                        "pitch": 1,
                        "position": 3,
                        "duration": 0.25,
                        "volume": 1
                    }
                ]
            }
        ],
        "comments": [
            {
                "UserID": "51ac822bf61f96380a000001",
                "comment": "THIS IS GREAT."
            },
            {
                "UserID": "51ac822bf61f96380a000000",
                "comment": "THIS IS GOOD."
            }
        ]
    },

    /**
     * Sets up our canvas and stage
     * @param x The x position of the canvas/stage
     * @param y The y position of the canvas/stage
     */
    setUpCanvas: function (x, y) {

        this.stage = new Kinetic.Stage({
            x: x,
            y: y,
            container: 'container',
            width: this.width,
            height: this.height
        });


    },

    /**
     * Collapses the UI for the layers after the minimized layer
     * @param layer The layer being minimized
     * @private
     */
    _collapseUi: function (layer) {
        var otherLayers = [];
        var afterInstrumentTrigger = false;

        var cpbg = layer.get('.cpbg')[0];
        cpbg.setHeight(35);

        // We're going to get all the layers after the instrument we want to minimize because we only need to
        // readjust the Y coordinate of the layers under the instrument we minimize
        for (var k = 0; k < this.instrumentLayers.length; k++) {
            if (this.instrumentLayers[k] == layer) {
                afterInstrumentTrigger = true;
            }
            if (this.instrumentLayers[k] != layer && afterInstrumentTrigger == true) {
                otherLayers.push(this.instrumentLayers[k]);
            }
        }

        for (var j = 0; j < otherLayers.length; j++) {
            otherLayers[j].setY(otherLayers[j].getY() - 160);
            otherLayers[j].draw();
        }
        // Finally we set the banklayer 200px up to make sure it follows suit
        this.bankLayer.setY(this.bankLayer.getY() - 160);
        this.bankLayer.draw();

    },

    /**
     * Expands the UI for the layers after the minimized layer
     * @param layer The layer being minimized
     * @private
     */
    _expandUi: function (layer) {
        var otherLayers = [];
        var afterInstrumentTrigger = false;

        var cpbg = layer.get('.cpbg')[0];
        cpbg.setHeight(196);

        // We're going to get all the layers after the instrument we want to minimize because we only need to
        // readjust the Y coordinate of the layers under the instrument we minimize
        for (var k = 0; k < this.instrumentLayers.length; k++) {
            if (this.instrumentLayers[k] == layer) {
                afterInstrumentTrigger = true;
            }
            if (this.instrumentLayers[k] != layer && afterInstrumentTrigger == true) {
                otherLayers.push(this.instrumentLayers[k]);
            }
        }

        for (var j = 0; j < otherLayers.length; j++) {
            otherLayers[j].setY(otherLayers[j].getY() + 160);
            otherLayers[j].draw();
        }

        // Finally we set the banklayer 200px down to make sure it follows suit
        this.bankLayer.setY(this.bankLayer.getY() + 160);
        this.bankLayer.draw();

    },

    /**
     * Minimized the instrument to a single column row
     * @param layer The layer to be minimized
     * @private
     */
    _minimizeInstrument: function (layer) {

        var groups = layer.get('.notes');

        var uigroup = layer.get('.uigroup')[0];
        /*
         for(var i = 0; i < this.instrumentLayers.length; i++) {
         //            if(this.instrumentLayers[i] != layer) {
         var group = this.instrumentLayers[i].get('.uigroup')[0];
         this.instrumentLayers[i].setY(this.instrumentLayers[i].getY() - 200);

         //            }
         }
         */

        // Let's get one rectangle to see if our layer is actually minimized
        // Not efficient but oh well

        var rectEnabled;
        if (layer.get('.u0')[0] != undefined) {
            rectEnabled = layer.get('.u0')[0].getAttr('enabled');
        } else {
            rectEnabled = layer.get('.n0')[0].getAttr('enabled');
        }


        if (rectEnabled == true) {
            this._collapseUi(layer);
        } else {
            this._expandUi(layer);
        }
//        if(layer.get('.n0'))


        groups.each(function (group, index) {

            group.getChildren().each(function (rect, index) {
                if (rect.getAttr('hasNote') == false) {
                    //for some reason listening doesn't return a boolean, we're going to use a custom attribute instead
                    // fuck the police
                    if (rect.getAttr('enabled') == true) {
                        rect.setOpacity(0);
                        rect.setListening(false);
                        layer.get('.addcolumns')[0].setListening(false);
                        layer.get('.killinstr')[0].setListening(false);
                        rect.setAttr('enabled', false);
                    } else {
                        rect.setOpacity(1);
                        rect.setListening(true);
                        layer.get('.addcolumns')[0].setListening(true);
                        layer.get('.killinstr')[0].setListening(true);
                        rect.setAttr('enabled', true);
                    }

                } else {
                    if (rect.getAttr('enabled') == true) {
                        rect.setListening(false);
                        rect.setAttr('enabled', false)
                        rect.setAttr('lastY', rect.getY());
                        layer.get('.addcolumns')[0].setListening(false);
                        layer.get('.killinstr')[0].setListening(false);
                        rect.setY(group.getY());
                    } else {
                        rect.setListening(true);
                        rect.setAttr('enabled', true);
                        layer.get('.addcolumns')[0].setListening(true);
                        var shape = layer.get('.killinstr')[0];
                        layer.get('.killinstr')[0].setListening(true);
                        rect.setY(rect.getAttr('lastY'));
                    }

                }
            });

        });


    },

    /**
     * Creates a visual array which contains empty notes inbetween the position of notes
     * @param notesVisual The empty visualnotes array to be given
     * @param notes The notes from which the visualnotes array has to be created
     * @returns {*|Array|string|Blob} A newly created visualnotes array
     */
    createVisualArray: function (notesVisual, notes) {
        notesVisual = notes.slice(0);
        this.maxPosition = 0;

        for (var i = 0; i < notesVisual.length; i++) {
            if (notesVisual[i].position > this.maxPosition) {
                this.maxPosition = notesVisual[i].position;
            }
        }

        for (var j = 0; j < this.maxPosition; j++) {
            if ((notesVisual[j + 1].position - notesVisual[j].position) > 1) {
                var difference = notesVisual[j + 1].position - notesVisual[j].position - 1;

                for (var k = 1; k <= difference; k++) {
                    this.insertEmptyNote(j + k, notesVisual);
                }
                j += difference;
            }
        }

        return notesVisual;

    },
    /**
     * Adds a click event to the designated layer
     * @param layer The layer to which the click events should be added
     */
    addClickEventLastAddedInstrument: function (layer) {
        var self = this;

        layer.on('click', function (event) {
            //get the shape that was clicked on
            var shape = event.targetNode;
            var group = shape.getParent();
            var layer = group.getParent();
            var name = shape.getName();

            if (name.substring(0, 1) == 'n') {
                if (shape.getAttr('hasNote') == true) {
//                        alert("pitch found");
                    var position = shape.getAttr('notePosition');
                    var pitch = shape.getAttr('pitchValue');

                    self._replaceNoteSamePitch(position, pitch, layer)
                    self._updateColumnSamePitch(layer, shape, group);
                    console.log(layer);


                } else {
//                        alert('note found, pitch not found')
                    var position = shape.getAttr('notePosition');
                    var pitch = shape.getAttr('pitchValue');
                    var x = 5
                    self._replaceEmptyNote(position, pitch, layer);
                    self._updateColumn(layer, shape, group);
                    console.log(layer);
                }
            } else
            //u for undefined
            if (name.substring(0, 1) == 'u') {
                var position = shape.getAttr('notePosition');
                var pitch = shape.getAttr('pitchValue');
                self._replaceEmptyNote(position, pitch, layer);
                self._updateEmptyColumn(layer, shape, group);
            } else if (name == 'minimize') {
                self._minimizeInstrument(layer);
                layer.draw();
            } else if (name == 'addcolumns') {
//                    var furthestX = layer.getAttr('
                var length = layer.getAttr('visualNotes').length;
                var spacing = 0;
                var offset = 100 + (  (length * 20) + (spacing * length));
                self.insertEmptyNote(length - 1, layer.getAttr('visualNotes'));
                self.createEmptyColumn(layer, offset, layer.getY(), length, null); // no -1 because we just added a new note!
                layer.draw();


            } else if (name == 'killinstr') {
                self.removeInstrument(layer);
                self.songLength = 0;
                for (var x = 0; x < self.instrumentLayers.length; x++) {
                    if (self.instrumentLayers[x].getAttr('visualNotes').length > self.songLength) {
                        self.songLength = self.instrumentLayers[x].getAttr('visualNotes').length
                    }

                }
            }
        });


    },

    /**
     * Insert an empty note in the visual notes array
     * @param index The index on which to insert something
     * @param notesVisual The array into which you are inserting
     */
    insertEmptyNote: function (index, notesVisual) {

        var emptyNote = {position: null, pitch: null, volume: null, duration: null};
        notesVisual.splice(index, 0, emptyNote);
    },

    /**
     * For now not used
     * @param markerLayer
     * @param y
     */
    createMarker: function (markerLayer, y) {
        var rect = new Kinetic.Rect({
            x: 209,
            y: y,
            width: 37,
            height: 195,
            fill: 'red',
            strokeWidth: 0,
            name: 'marker',
            opacity: 0.7,
            isListening: false
        });

        markerLayer.add(rect);

    },

    /**
     * Adds the click events for the music library
     */
    listenerBankEvents: function () {
        var self = this;
        this.bankLayer.on('click', function (event) {
            var shape = event.targetNode;
            var name = shape.getName();

            if (name == 'addnewinstrument') {

                var type = shape.getAttr('instrumenttype');
                var instrument = {
                    "instrumenttype": type,
                    "notes": [
                        {
                            "pitch": null,
                            "position": null,
                            "duration": null,
                            "volume": null
                        }
                    ]
                }
                self.addInstrument(instrument, true);
                self.drawLastInstrument();
            }
        });

    },

    /**
     * @deprecated we're using individual click event assigning on startup/addition  of an instrument now. Use addClickEvent()
     */
    clickEvents: function () {
        var self = this;
        var lengthglobal = this.instrumentLayers.length;

        self.listenerBankEvents();


        for (var i = 0; i < lengthglobal; i++) {
            var self = this;
            this.instrumentLayers[i].on('click', function (event) {
                //get the shape that was clicked on
                var shape = event.targetNode;
                var group = shape.getParent();
                var layer = group.getParent();
                var name = shape.getName();

                if (name.substring(0, 1) == 'n') {
                    if (shape.getAttr('hasNote') == true) {
//                        alert("pitch found");
                        var position = shape.getAttr('notePosition');
                        var pitch = shape.getAttr('pitchValue');
                        self._replaceNoteSamePitch(position, pitch, layer)
                        self._updateColumnSamePitch(layer, shape, group);


                    } else {
//                        alert('note found, pitch not found')
                        var position = shape.getAttr('notePosition');
                        var pitch = shape.getAttr('pitchValue');
                        var x = 5
                        self._replaceEmptyNote(position, pitch, layer);
                        self._updateColumn(layer, shape, group);
                    }
                }
                //u for undefined
                if (name.substring(0, 1) == 'u') {
                    var position = shape.getAttr('notePosition');
                    var pitch = shape.getAttr('pitchValue');
                    self._replaceEmptyNote(position, pitch, layer);
                    self._updateEmptyColumn(layer, shape, group);


//                    self._replaceEmptyNote(position, pitch, layer);
//                    self._updateLayer(layer);

                }

                if (name == 'minimize') {
                    self._minimizeInstrument(layer);
                    layer.draw();
                } else if (name == 'addcolumns') {
//                    var furthestX = layer.getAttr('
                    var length = layer.getAttr('visualNotes').length;
                    var spacing = 0;
                    var offset = 100 + (  (length * 20) + (spacing * length));
                    self.insertEmptyNote(length - 1, layer.getAttr('visualNotes'));
                    self.createEmptyColumn(layer, offset, layer.getY(), length, null); // no -1 because we just added a new note!
                    layer.draw();


                } else if (name == 'killinstr') {
                    self.removeInstrument(layer);
                    self.songLength = 0;
                    for (var x = 0; x < self.instrumentLayers.length; x++) {
                        if (self.instrumentLayers[x].getAttr('visualNotes').length > self.songLength) {
                            self.songLength = self.instrumentLayers[x].getAttr('visualNotes').length
                        }

                    }

                }
            });
        }

    },

    /**
     * Create a column out of a filled note (not null)
     * @param note The note to be passed for position pitch etc
     * @param layer The layer to which the column needs to be added
     * @param x The x coordinate of the column(left)
     * @param y The y coordinate of teh column(top)
     * @param group The group it needs to be added to, null for making a new group
     */
    createColumn: function (note, layer, x, y, group) {
        var origin = 0;

        if (note.position > this.songLength) {
            this.songLength = note.position;
        }
        // detecting the note depending on pitch, rest of the rectangles do nothing for now
        if (group == null) {
            group = new Kinetic.Group({
                x: x,
                y: layer.getY(),
                id: note.position,
                name: 'notes'

            });
        }
        var color = layer.getAttr('color');
        for (var i = 0; i < 5; i++) {
            if (note.pitch == this.pitchToRect[i]) {
                var rect = new Kinetic.Rect({
                    x: x,
                    y: y + origin,
                    lastY: y + origin,
                    width: 35,
                    height: 35,
                    fill: layer.getAttr('color'),
//                    stroke: "black",
//                    strokeWidth: 2,
                    pitchValue: note.pitch,
                    notePosition: note.position,
                    hasNote: true,
                    name: 'n' + note.position,
                    enabled: true,
                    opacity: 1
                });
            } else {
                var rect = new Kinetic.Rect({
                    x: x,
                    y: y + origin,
                    lastY: y + origin,
                    width: 35,
                    height: 35,
                    fill: "#3d3a39",
//                    stroke: "black",
//                    strokeWidth: 0,
                    pitchValue: this.pitchToRect[i],
                    notePosition: note.position,
                    hasNote: false,
                    opacity: 1,
                    enabled: true,
                    name: 'n' + note.position
                });
            }


            group.add(rect);
            origin += 40;
        }
        layer.add(group);
    },

    /**
     * Moves the markers up for an x component to simulate playing
     * @param markerLayer the layer on which the markers reside
     */
    moveMarkers: function (markerLayer) {

        var children = markerLayer.getChildren();

        for (var i = 0; i < children.length; i++) {
            var x = children[i].getX();
            children[i].setX(x + 40);
            markerLayer.draw();
        }

    },

    /**
     * Reset the markers back to their original position
     * @param markerLayer The
     */
    resetMarker: function (markerLayer) {
        var children = markerLayer.getChildren();

        for (var i = 0; i < children.length; i++) {
            var x = 49;
            children[i].setX(x);
            markerLayer.draw();
        }
    },


    /**
     * Animate function to simulate playing, currently unused due to technical limitations
     * @param layer The layer on which the marker resides(?)
     */
    animate: function (layer) {
        var shapes = this.stage.get('.marker');

        var anim = new Kinetic.Animation(function (frame) {
            var time = frame.time,
                timeDiff = frame.timeDiff,
                frameRate = frame.frameRate;

            shapes[0].setX(0.1 * time);
        }, layer);
        anim.start();


    },

    /**
     * Replaces an note(null) with one with position and pitch
     * @param position The position of the note
     * @param pitch The pitch of the note
     * @param layer The layer on which the note resides
     * @private
     */
    _replaceEmptyNote: function (position, pitch, layer) {
        layer.getAttr('notes').splice(position, 1, {position: position, pitch: pitch, volume: 1, duration: 1});
        for (var i = 0; i < layer.getAttr('visualNotes').length; i++) {
            if (i == position) {
                layer.getAttr('visualNotes').splice(i, 1, {position: position, pitch: pitch, volume: 1, duration: 1});
            }
        }
        this.sortNotes(layer.getAttr('notes'));
    },
    findWithAttr: function (array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    },

    /**
     * Inserts a null note upon clicking the correct pitch
     * @param position The position on which you are clicking
     * @param pitch The pitch on which you are clicking
     * @param layer The layer on which you are clicking
     * @private
     */
    _replaceNoteSamePitch: function (position, pitch, layer) {

        var notes = layer.getAttr('notes');

        var index = this.findWithAttr(notes, 'position', position);
        layer.getAttr('notes').splice(index, 1);
        for (var i = 0; i < layer.getAttr('visualNotes').length; i++) {
            if (i == position) {
                layer.getAttr('visualNotes').splice(i, 1, {position: null, pitch: null, volume: null, duration: null});
            }
        }
        this.sortNotes(layer.getAttr('notes'));
    },

    /**
     * Creates an empty column, only needs the position as the pitch is irrelevant(it's empty)
     * @param layer The layer on which to add the column
     * @param x The x coordinate of the column(left)
     * @param y The y coordinate of the column(top)
     * @param position The position of the note
     * @param group The group to which to add the column, null if a new group should be created
     */
    createEmptyColumn: function (layer, x, y, position, group) {
        var origin = 0;
        if (position > this.songLength) {
            this.songLength = position;
        }
        if (group == null) {
            group = new Kinetic.Group({
                y: layer.getY(),
                x: x,
                id: position,
                name: 'notes'
            });
        }
        for (var i = 0; i < 5; i++) {
            var rect = new Kinetic.Rect({
                x: x,
                y: y + origin,
                lastY: y + origin,
                width: 35,
                height: 35,
                fill: "#3d3a39",
//                stroke: "black",
//                strokeWidth: 2,
                pitchValue: this.pitchToRect[i],
                notePosition: position,
                hasNote: false,
                enabled: true,
                name: 'u' + position
            });
            if (group != null) {
                group.add(rect);
            }
            origin += 40;
        }
        layer.add(group);
    },


    /**
     * Creates a raster of empty and normal columns
     * @param layer The layer to which to add the columns
     * @param x The x coordinate of the layer
     * @param y The y coordinate of the layer
     */
    createRaster: function (layer, x, y) {

        var xOrigin = x;
        var notes = layer.getAttr('visualNotes');
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].position == null) {
                this.createEmptyColumn(layer, x + xOrigin, y, i, null);
                xOrigin += 20;
//                layer.draw();

            } else {
                this.createColumn(notes[i], layer, x + xOrigin, y, null);
                xOrigin += 20;
//                layer.draw();

            }
        }
    },

    /**
     * Initial setup of the instruments when the sequencer first loads
     * @param songs The songs from which to create the instruments
     */
    setupInstruments: function (songs) {

        for (var i = 0; i < songs.length; i++) {
            for (var j = 0; j < songs[i].instruments.length; j++) {
                var instrument = songs[i].instruments[j];

                this.addInstrument(instrument, true);


            }
        }

    },


    /**
     * update the layer, unused
     * @param layer the layer to be updated
     * @private
     */
    _updateLayer: function (layer) {
        var x = layer.getX();
        var y = layer.getY();
        layer.removeChildren();
        var notes = layer.getAttr('notes');
        var visualNotes = layer.getAttr('visualNotes');

        this.createRaster(layer, x, y);
        layer.draw();

    },

    /**
     * Updates an empty column and redraws it
     * @param layer the layer on which the column resides
     * @param shape To get the x and y coordinates
     * @param group The group in which the column resides
     * @private
     */
    _updateEmptyColumn: function (layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var pitch = shape.getAttr('pitchValue');
        var x = group.getX();
        var y = group.getY();

        group.removeChildren();

        this.createColumn({position: position, pitch: pitch, volume: 1, duration: 1}, layer, x, y, group);
        group.draw();
    },

    /**
     * Updates the column of the same pitch, removes children and redraws a new empty column
     * @param layer The layer on which to update the column
     * @param shape To get our position
     * @param group Group in which the shape resides for convenience
     * @private
     */
    _updateColumnSamePitch: function (layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var x = group.getX();
        var y = group.getY();

        group.removeChildren();

        this.createEmptyColumn(layer, x, y, position, group);
        group.draw();
    },

    _updateColumn: function (layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var pitch = shape.getAttr('pitchValue');
        var x = group.getX();
        var y = group.getY();
        var notes = layer.getAttr('notes');
        var length = notes.length;

        group.removeChildren();

        for (var i = 0; i < length; i++) {
            if (notes[i].position == position) {
                this.createColumn(layer.getAttr('notes')[i], layer, x, y, group);
            }
        }
        group.draw();
    },

    /**
     * Adds the instrument library from a statically defined list of instruments
     * @param instruments The instruments from which to create our library
     */
    addInstrumentBank: function (instruments) {
        var y = this.instrumentLayers.length * 200 + 4; // get the last instrumentLayer
        var x = 20;

        this.bankLayer = new Kinetic.Layer({
            x: x,
            y: y,
            height: 200,
            width: 200

        });


        var bankbg = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 185,
            height: 0,
            fill: '#3d3a39',
            strokeWidth: 0,
            name: 'instrbankbg',
            opacity: 1
        });

        var titlebg = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 185,
            height: 25,
            fill: 'black',
            name: 'titleBG',
            opacity: 1
        });

        var titleText = new Kinetic.Text({
            x: 5,
            y: 2,
            text: 'Instrument Library',
            fontSize: 20,
            fill: 'white'
        });


        var group = new Kinetic.Group({
//           x: this.bankLayer.getX(),
//            y: this.bankLayer.getY(),
            x: 0,
            y: 0,
            name: 'bankgroup'
        });

        group.add(bankbg);
        group.add(titlebg);
        group.add(titleText);


        var offset = 30;
        var rectHeight = 26;

        for (var i = 0; i < instruments.length; i++) {
            var instrumentText = new Kinetic.Text({
                x: 2,
                y: 0 + offset,
//                fontFamily: elementalEnd, // doesnt work for now
                text: instruments[i].instrumenttype,
                fontSize: 15,
                fill: 'black',
                fontFamily: 'Calibri'
            });

            var previewButton = new Kinetic.Shape({
                drawFunc: function (canvas) {
                    var context = canvas.getContext();
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.lineTo(16, 8);
                    context.lineTo(0, 16);
                    context.lineTo(0, 0);
                    context.closePath();
                    canvas.fillStroke(this);
                },
                fill: 'black',
                x: 145,
                y: 0 + offset,
                name: 'playsample',
                instrumenttype: instruments[i].instrumenttype

            });

            var addInstrumentButton = new Kinetic.Shape({
                drawFunc: function (canvas) {
                    var context = canvas.getContext();
                    context.beginPath();
                    context.moveTo(8, 0);
                    context.lineTo(8, 16);
                    context.moveTo(0, 8);
                    context.lineTo(16, 8);
                    context.closePath();
                    canvas.fillStroke(this);
                },
                fill: 'black',
                x: 165,
                y: 0 + offset,
                stroke: 'black',
                strokeWidth: 4,
                name: 'addnewinstrument',
                instrumenttype: instruments[i].instrumenttype

            });
            group.add(addInstrumentButton)
            group.add(previewButton);
            group.add(instrumentText);
            offset += 21;
            rectHeight += 22;
        }

        this.listenerBankEvents();
        bankbg.setHeight(rectHeight);

        this.bankLayer.add(group);
        this.stage.add(this.bankLayer);
        this.bankLayer.draw();
    },

    /**
     * Adds a new instrument to our instrumentLayers, called when setting up and when a user clicks the add button
     * on the library element
     * @param instrument The Instrument to be added
     * @param addClickEvents true if we need to add clicEvents(after setup) false if not(on setup)
     * @returns {Kinetic.Layer} The layer with the added Instrument.
     */
    addInstrument: function (instrument, addClickEvents) {

        var visualNotes = [];
        var notes = instrument.notes;
        visualNotes = this.createVisualArray(visualNotes, notes);
        var y = 0;

        for (var i = 0; i < this.instrumentLayers.length; i++) {
            y += 67
        }

        var index = this.findWithAttr(this.instruments, 'instrumenttype', instrument.instrumenttype);

        var color = this.instruments[index].color;

        var layer = new Kinetic.Layer({
            x: 10,
            y: y,
            height: 200,
            instrumenttype: instrument.instrumenttype,
            notes: instrument.notes,
            visualNotes: visualNotes,
            color: color
        });

        if (addClickEvents == true) {
            this.addClickEventLastAddedInstrument(layer);
        }

        this.instrumentLayers.push(layer);
        this.stage.add(layer);

        return layer;

    },

    /**
     * Removes an instrument and destroys the layer
     * @param layer Layer to be destroyed
     */
    removeInstrument: function (layer) { // Removes the instrument by type


        for (var index = this.instrumentLayers.indexOf(layer) + 1; index < this.instrumentLayers.length; index++) {
            this.instrumentLayers[index].setY(this.instrumentLayers[index].getY() - 200);
            this.instrumentLayers[index].draw();

        }
        var index = this.instrumentLayers.indexOf(layer);
        this.instrumentLayers.splice(index, 1);
        // Attempting to completely destroy the layer, still bugs out
        // At this point i don't know if this actually does anything, it does get rid of all the layers individual elemnents.
        layer.get('.notes').each(function (node, n) {
            node.destroy();
        });
        layer.get('.visualNotes').each(function (node, n) {
            node.destroy();
        });
        layer.get('.Group').each(function (node, n) {
            node.destroy();
        });
        layer.get('.uigroup').each(function (node, n) {
            node.destroy();
        });
        layer.clear();
        this.bankLayer.setY(this.bankLayer.getY() - 200);
        this.bankLayer.draw();
    },

    /**
     * Draws the user control panel on a new layer(usually the instrument layer)
     * @param layer The layer to which the CP needs to be added
     */
    drawCP: function (layer) {
        var correction = 0;
        if (layer.getY() != 0) {
            correction = 67 * (layer.getY() / 67);
        }

        var group = new Kinetic.Group({
            name: 'uigroup'

        });
        var bg = new Kinetic.Rect({
            x: layer.getX(),
            y: layer.getY() + correction,
            width: 185,
            height: 196,
            fill: '#3d3a39',
            strokeWidth: 0,
            name: 'cpbg',
            opacity: 1

        });

        var titleBarBG = new Kinetic.Rect({
            x:layer.getX(),
            y: layer.getY() + correction,
            width: 185,
            height: 20,
            fill: layer.getAttr('color'),
            name: 'cptitlebar',
            opacity: 1
        });


        var instrumentText = new Kinetic.Text({
            x: layer.getX() + 2,
            y: layer.getY() + correction + 2,
            text: layer.getAttr('instrumenttype'),
            fontSize: 15,
            fontFamily: 'Calibri',
            fill: 'black'
        });

//        var minButton = new Kinetic.Circle({
//            x: layer.getX() + 155,
//            y: layer.getY() + correction + 10,
//            radius: 5,
//            fill: 'white',
//            sroke: 'black',
//            strokeWidth: 1,
//            name: 'minimize'
//        });

//        var killButtonImage = new Image();
//        killButtonImage.onload = function() {
//            var killButton = new Kinetic.Image({
//                x: layer.getX() + 170,
//                y: layer.getY() + correction + 10,
//                name: 'killinstr',
//                image: killButtonImage,
//                width: 20,
//                height: 20
//            });


//            group.add(addimage);
//            layer.draw();
//        };

//        var addColumnsButton = new Kinetic.Circle({
//            x: layer.getX() + 140,
//            y: layer.getY() + correction + 10,
//            radius: 5,
//            fill: 'red',
//            sroke: 'black',
//            strokeWidth: 1,
//            name: 'addcolumns'
//        });


        group.add(bg);
        group.add(titleBarBG);
        group.add(instrumentText);
        var minButtonImage = new Image();
        minButtonImage.onload = function() {
            var minButton = new Kinetic.Image({
                x: layer.getX() + 142,
                y: layer.getY() + correction,
                name: 'minimize',
                image: minButtonImage,
                width: 20,
                height: 20
            });


            group.add(minButton);
            layer.draw();
        };
        var killButtonImage = new Image();
        killButtonImage.onload = function() {
            var killButton = new Kinetic.Image({
                x: layer.getX() + 164,
                y: layer.getY() + correction,
                name: 'killinstr',
                image: killButtonImage,
                width: 20,
                height: 20
            });


            group.add(killButton);
            layer.draw();
        };
        var addColumnsButton = new Image();
        addColumnsButton.onload = function() {
            var addimage = new Kinetic.Image({
                x: layer.getX() + 120,
                y: layer.getY() + correction + 0,
                name: 'addcolumns',
                width: 20,
                height: 20,
                image: addColumnsButton

            });


            group.add(addimage);
            layer.draw();
        };
        addColumnsButton.src = 'images/adcollumbutton20x20px.png';
        killButtonImage.src = 'images/deleteinstrumentbutton20x20px.png';
        minButtonImage.src = 'images/Minimizebutton20x20px.png';
//        addColumnsButton.src = 'http://i.imgur.com/uVAKa2g.png';


        layer.add(group);
    },

    /**
     * Draws the last instrument in our instrumentLayers array
     */
    drawLastInstrument: function () {
        if (this.instrumentLayers.length == 1) {
            var y = 0
            var layer = this.instrumentLayers[this.instrumentLayers.length - 1];
            this.createRaster(layer, layer.getX() + 40, layer.getY());
            this.drawCP(layer);
            layer.draw();

            // update our instrumentbank aswell to expand
            this.bankLayer.setY(this.bankLayer.getY() + 200);
            this.bankLayer.draw();
//        this.createRaster(instrumentLayer, 10, this.)
        } else {
            var y = this.instrumentLayers[this.instrumentLayers.length - 2].getY() + 200;
            var layer = this.instrumentLayers[this.instrumentLayers.length - 1];
            this.createRaster(layer, layer.getX() + 40, layer.getY());
            this.drawCP(layer);
            layer.draw();

            // update our instrumentbank aswell to expand
            this.bankLayer.setY(this.bankLayer.getY() + 200);
            this.bankLayer.draw();
//        this.createRaster(instrumentLayer, 10, this.)
        }
    },

    /**
     * Redraws all the instruments, also draws the control panel to the instruments
     * Used on setup
     */
    drawInstruments: function () {
        for (var i = 0; i < this.instrumentLayers.length; i++) {
            this.createRaster(this.instrumentLayers[i], this.instrumentLayers[i].getX() + 40, this.instrumentLayers[i].getY());
            this.drawCP(this.instrumentLayers[i]);
            this.instrumentLayers[i].draw();

        }

    },

    /**
     * Sorts the notes in an array by their position property
     * @param notes The Note array to be sorted
     */
    sortNotes: function (notes) {
        notes.sort(function (a, b) {
            if (a.position < b.position)
                return -1;
            if (a.position > b.position)
                return 1;
            return 0;
        });
    },

    /**
     * Doesn't work yet
     * @returns {*}
     */
    saveSong: function () {
        var lastSong = this.songs.length - 1;

        /*
         Let's first search for some new instruments if any and add them to the song array
         */

        for (var i = 0; i < this.instrumentLayers.length(); i++) {

//            if(this.instrumentLayers[i].getAttr('instrumenttype') != this.songs[i].instruments.instrumenttype)
        }
        return this.songs;


    },

    /**
     * initialize our stage/canvas
     * @param x The x position of the sequencer
     * @param y The y position of the sequencer
     * @param songs The songs to be loaded into the sequencer, leave empty if no previous song is selected
     */
    init: function (x, y, songs) {

        this.setUpCanvas(x, y);
        this.songs.length = 0;

        this.songs = songs

//        songs.push(this.song1);
//        songs.push(this.song2);
//        this.songs.push(this.song3);

        this.setupInstruments(this.songs);
        this.drawInstruments();

        /* this.markerLayer = new Kinetic.Layer({
         name: 'marker'
         });
         //        this.createMarker(this.markerLayer);
         var y = 0;
         for (var i = 0; i < this.instrumentLayers.length; i++) {
         this.createMarker(this.markerLayer, y);
         this.stage.add(this.markerLayer);
         y += 201;
         }
         //        this.stage.add(this.markerLayer);
         */

        this.addInstrumentBank(this.instruments);

//        this.clickEvents();
    }
}


