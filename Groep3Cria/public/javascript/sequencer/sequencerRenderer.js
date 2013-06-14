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
    height: 1200,
    maxPosition: 0,
    instrumentLayers: [],
    isPlaying: false,
    numFrames: 0,
    time_step: 1,
    frame_scale: 1000 / 60,
    lastUpdate: null,
    markerLayer: null, //TODO remove and make an array of markers

    pitchToRect: [2.0, 1.5, 1, 0.667, 0.5],

    setUpCanvas: function (x, y) {

        this.stage = new Kinetic.Stage({
            x: x,
            y: y,
            container: 'container',
            width: this.width,
            height: this.height
        });


    },

    update: function (dt) {
        //TODO add audio scheduling and stuff
        //TODO do something with dt
        this.numFrames++ * dt;


    },

    draw: function () {
        alert("hi");

        this.requestAnimFrame(this.draw);
    },

    //TODO fetch the notes from database
    fetchNotes: function (notes) {
        var note1 = new Note(0, 0.667, -0.5, 1);
        var note2 = new Note(3, 0.5, -0.5, 1);
        var note3 = new Note(5, 0.5, -0.5, 1);
        var note4 = new Note(6, 1, -0.5, 1);
        var note5 = new Note(10, 1, -0.5, 1);
        var note6 = new Note(20, 1, -0.5, 1);
        var note7 = new Note(22, 1, -0.5, 1);
        var note8 = new Note(23, 1, -0.5, 1);
        notes.push(note1);
        notes.push(note2);
        notes.push(note3);
        notes.push(note4);
        notes.push(note5);
        notes.push(note6);
        notes.push(note7);
        notes.push(note8);
        return notes;

    },

    render: function () {
        var now = new Date().getTime();
        var delta = now - this.lastUpdate;
        this.lastUpdate = now;

        for (var t = 0; t < delta; t += this.time_step) {
            this.update(this.time_step);
        }
        delta = (new Date().getTime() - now);
        setTimeout(this.render - delta, this.frame_scale);
    },

    togglePlay: function () {
        this.isPlaying = !this.isPlaying;
    },
    insertEmptyNote: function (index, notesVisual) {

        var emptyNote = {position: null, pitch: null, volume: null, duration: null};
        notesVisual.splice(index, 0, emptyNote);
    },

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

    createMarker: function (markerLayer, y) {
        var rect = new Kinetic.Rect({
            x: 49,
            y: y,
            width: 37,
            height: 192,
            fill: 'red',
            strokeWidth: 0,
            name: 'marker',
            opacity: 0.7
        });

        markerLayer.add(rect);

    },

    clickEvents: function () {

        for (var i = 0; i < this.instrumentLayers.length; i++) {
            var self = this;
            this.instrumentLayers[i].on('click',  function (event) {
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
            }); 
        }
        i=0; // needed?

    },

    createColumn: function (note, layer, x, y, group) {
        var origin = 0;
        // detecting the note depending on pitch, rest of the rectangles do nothing for now
        if(group == null) {
            group = new Kinetic.Group({
                x: x,
                y: layer.getY(),
                id: note.position

            });
        }
        for (var i = 0; i < 5; i++) {
            if (note.pitch == this.pitchToRect[i]) {
                var rect = new Kinetic.Rect({
                    x: x,
                    y: y + origin,
                    width: 35,
                    height: 30,
                    fill: "red",
                    stroke: "black",
                    strokeWidth: 2,
                    pitchValue: note.pitch,
                    notePosition: note.position,
                    hasNote: true,
                    name: 'n' + note.position
                });
            } else {
                var rect = new Kinetic.Rect({
                    x: x,
                    y: y + origin,
                    width: 35,
                    height: 30,
                    fill: "green",
                    stroke: "black",
                    strokeWidth: 2,
                    pitchValue: this.pitchToRect[i],
                    notePosition: note.position,
                    hasNote: false,
                    name: 'n' + note.position
                });
            }



            group.add(rect);
            origin += 40;
        }
        layer.add(group);
    },

    moveMarkers: function (markerLayer) {

        var children = markerLayer.getChildren();

        for(var i = 0; i < children.length; i++) {
            var x = children[i].getX();
            children[i].setX(x+40);
            markerLayer.draw();
        }

    },

    resetMarker: function(markerLayer) {
        var children = markerLayer.getChildren();

        for(var i =0; i < children.length; i++) {
		var x = 49;
		children[i].setX(x);
		markerLayer.draw();
	}
    },


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

    _replaceEmptyNote: function(position, pitch,  layer) {
        layer.getAttr('notes').splice(position, 1, {position: position, pitch: pitch, volume: 1, duration: 1});
        for(var i =0; i < layer.getAttr('visualNotes').length; i++) {
            if(i == position) {
                layer.getAttr('visualNotes').splice(i, 1, {position: position, pitch: pitch, volume: 1, duration: 1});
            }
        }
        this.sortNotes(layer.getAttr('notes'));
    },

    _replaceNoteSamePitch: function(position, pitch,  layer) {
        layer.getAttr('notes').splice(position, 1);
        for(var i =0; i < layer.getAttr('visualNotes').length; i++) {
            if(i == position) {
                layer.getAttr('visualNotes').splice(i, 1, {position: null, pitch: null, volume: null, duration: null});
            }
        }
        this.sortNotes(layer.getAttr('notes'));
    },

    createEmptyColumn: function (layer, x, y, position, group) {
        var origin = 0;
        if(group == null) {
            group = new Kinetic.Group({
                y: layer.getY(),
                x: x,
                id: position
            });
        }
        for (var i = 0; i < 5; i++) {
            var rect = new Kinetic.Rect({
                x: x,
                y: y + origin,
                width: 35,
                height: 30,
                fill: "blue",
                stroke: "black",
                strokeWidth: 2,
                pitchValue: this.pitchToRect[i],
                notePosition: position,
                hasNote: false,
                name: 'u' + position
            });
            group.add(rect);
            origin += 40;
        }
        layer.add(group);
    },

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

    setupInstruments: function (songs) {

        for (var i = 0; i < songs.length; i++) {
            for (var j = 0; j < songs[i].instruments.length; j++) {
                var instrument = songs[i].instruments[j];

                this.addInstrument(instrument);


            }
        }

    },

    _updateLayer: function(layer) {
        var x = layer.getX();
        var y = layer.getY();
        layer.removeChildren();
        var notes = layer.getAttr('notes');
        var visualNotes = layer.getAttr('visualNotes');

        this.createRaster(layer, x, y);
        layer.draw();

    },
    _updateEmptyColumn: function(layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var pitch = shape.getAttr('pitchValue');
        var x = group.getX();
        var y = group.getY();

        group.removeChildren();

        this.createColumn({position: position, pitch: pitch, volume: 1, duration: 1}, layer, x, y, group);
        group.draw();
    },
    _updateColumnSamePitch: function(layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var pitch = shape.getAttr('pitchValue');
        var x = group.getX();
        var y = group.getY();

        group.removeChildren();

        this.createEmptyColumn(layer, x, y, position, group);
        group.draw();
    },

    _updateColumn: function(layer, shape, group) {

        var position = shape.getAttr('notePosition');
        var pitch = shape.getAttr('pitchValue');
        var x = group.getX();
        var y = group.getY();
        var notes = layer.getAttr('notes');
        var length = notes.length;

        group.removeChildren();

        for(var i =0; i < length; i++) {
            if(i == position) {
                this.createColumn(layer.getAttr('notes')[i], layer, x, y, group);
            }
        }

//        this.createColumn(layer.notes[position], layer, x, y, group);
        group.draw();
    },

    addInstrument: function (instrument) {

        var visualNotes = [];
        var notes = instrument.notes;
        visualNotes = this.createVisualArray(visualNotes, notes);
        var y = 0;

        for(var i = 0; i < this.instrumentLayers.length; i++) {
            y += 67
        }


        var layer = new Kinetic.Layer({
            x: 10,
            y: y,
            height: 200,
            instrumenttype: instrument.instrumenttype,
            notes: instrument.notes,
            visualNotes: visualNotes
        });

        this.instrumentLayers.push(layer);
        this.stage.add(layer);

    },

    removeInstrument: function (instrument) { // Removes the instrument by type
        for (var i = 0; i < this.instrumentLayers.length; i++) {
            var layer = this.instrumentLayers[i];
            var type = layer.getAttr("instrumenttype");
            if (this.instrumentLayers[i].getAttr("instrumenttype") == instrument.instrumenttype) {
                this.instrumentLayers[i].destroy();
                this.instrumentLayers.splice(i, i + 1);
            }
        }
    },

    drawInstruments: function() {
        for(var i = 0; i < this.instrumentLayers.length; i++) {
            var layer = this.instrumentLayers[i];
            var y= this.instrumentLayers[i].getY();
                this.createRaster(this.instrumentLayers[i], this.instrumentLayers[i].getX(), this.instrumentLayers[i].getY());
                this.instrumentLayers[i].draw();

        }

    },

    init: function (x, y, songs) {

        this.setUpCanvas(x, y);

        this.setupInstruments(songs);
        this.drawInstruments();

        this.markerLayer = new Kinetic.Layer({
            name: 'marker'
        });
//        this.createMarker(this.markerLayer);
        var y = 0;
        for(var i = 0; i < this.instrumentLayers.length; i++) {
            this.createMarker(this.markerLayer, y);
            this.stage.add(this.markerLayer);
            y+=200;
        }
//        this.stage.add(this.markerLayer);

        this.clickEvents();
    },

    sortNotes: function(notes) {
        notes.sort(function(a, b) {
                if(a.position < b.position)
                    return -1;
                if(a.position > b.position)
                    return 1;
                return 0;
            });
        }
};

