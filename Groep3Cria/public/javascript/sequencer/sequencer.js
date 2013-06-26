/**
 * The type of notes available in the sequencer
 */
var notes = Object.freeze({
    HalfNote: 120,
    QuarterNote: 60,
    EighthNote: 30,
    SixtheenthNote: 15,
    DottedQuarterNote: 90,
    DottedEightNote: 45,
    DottedSixteenthNote: 22.5,
    TripletQuarterNote: 40,
    TripletEightNote: 20,
    TripletSixteenthNote: 10
});

/**
 * What type of note to use throughout the sequencer.
 * @type {Number}
 */
var globalNoteSpeed = notes.EighthNote;

/**
 * The audiocontext of the sequencer, needed for playing sounds
 * @type {null}
 */
var audioContext = null;

/**
 * A flag which indicates if the sequencer is playing music or not.
 * @type {Boolean}
 */
var isPlaying = false;

/**
 * Keeps track of the current note being scheduled
 */
var currentNote;

/**
 * How frequently to call the scheduling function in milliseconds
 * @type {Number}
 */
var lookahead = 75.0;

/**
 * How far ahead to schedule the audio in seconds
 * This is calculated from lookahead, and overlaps
 * with next interval (in case the timer is late)
 * @type {Number}
 */
var scheduleAheadTime = 0.1;

/**
 * This keeps track of when the next note is due
 * @type {Number}
 */
var nextNoteTime = 0.0;

/**
 * setInterval identifier
 * @type {Number}
 */
var timerID = 0;

/**
 * The song length in beats
 * @type {Number}
 */
var songLength = 0;

/**
 * All the instrument audio in an array
 * @type {Array}
 */
var source = [];

/**
 * All the available instruments in the sequencer.
 * Contains instrument name and path to the instrument audio file.
 * @type {Array}
 */
var availableInstruments = [
    {instrumenttype: "Bass", instrumenturl: "audio/Bass_guitar_2.wav"},
    {instrumenttype: "Cymbal", instrumenturl: "audio/Cymbal_2.wav"},
    {instrumenttype: "Hi-hat", instrumenturl: "audio/Hi-hat_2.wav"},
    {instrumenttype: "Snare", instrumenturl: "audio/Snare_1.wav"},
    {instrumenttype: "Kick", instrumenturl: "audio/kick.wav"},
    {instrumenttype: "Piano", instrumenturl: "audio/Piano_3.wav"},
    {instrumenttype: "Clap", instrumenturl: "audio/clap.wav"},
    {instrumenttype: "Pad", instrumenturl: "audio/Bass_guitar_2.wav"}
];

/**
 * This is the array of the available instrument names, which will be filled during initialization
 * @type {Array}
 */
var instrumenttypes = [];

/**
 * An array which will contain individual songs, split from the recursive song structure.
 * @type {Array}
 */
var songs = [];

/**
 * The seed song
 */
var seed;

/**
 * The original song directly fetched from the database, without any modifications.
 */
var original;

/**
 * The current saved progress of the song
 */

var saved;

/**
 * Loads the instrument names into the instrumenttypes array
 */
function loadInstrumentTypesIntoArray() {
    for (var x = 0; x < availableInstruments.length; x++) {
        instrumenttypes.push(availableInstruments[x].instrumenttype);
    }
}

/**
 * An initialization function
 * @param id The ID of the song to load. It can either be an empty song, or an existing one.
 */
function init(id) {

    console.log("[LOG] Initializing resources...");
    loadAudioSources();

    var http = new XMLHttpRequest();

    loadSongsIntoArray(id);

    getMaxSongLength();

    console.log(songs);

    sequencerRenderer.init(0,0, songs);

    loadInstrumentTypesIntoArray();

    console.log("[LOG] Done!");
}

/**
 * Grabs a song from the database based on the song ID
 * @param id The song ID to load
 * @param base The variable to hold the loaded song
 * @return {*} The loaded song as an object
 */
function fetchSongWithXMLHttpRequest(id, base) {
    var http = new XMLHttpRequest();

    var url = "/song/" + id;
    http.open("GET", url, false);
    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            base = JSON.parse(http.responseText);
            base = base.songs;
            original = base;
        }
    }
    http.send(null);
    return base;
}

function saveSong()
{
    saved = original;
    for(var i=0;i<sequencerRenderer.instrumentLayers.length;i++)
    {
        var instrument = {instrumenttype: null, notes: []};
        instrument.instrumenttype = sequencerRenderer.instrumentLayers[i].attrs.instrumenttype;
        instrument.notes = sequencerRenderer.instrumentLayers[i].attrs.notes;

        saved.instruments[i] = instrument;
    }

    saved.author = "51c859d24cc4047534000010";
    saved.volume = 100;
    saved.based_on = null;

    console.log(saved);
    alert('now sending a request');
    var http = new XMLHttpRequest();

    var url = "updatesong";
    var params = "song=" + JSON.stringify(saved);
    http.open("POST", url, true);

    alert(params);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
}

/**
 * Splits a song into individual songs and loads them into a songs array
 * The base song automatically updates in this process until hit hits the seed.
 * @param base The base song
 * @return {*} The base song as a seed
 */
function loadSongsIntoSongArray(base) {
    while (base.based_on != null) {
        console.log("[LOG] Loading notes of song \"" + base.name + "\"");
        songs.push(base);
        base = base.based_on;
        if (base.based_on == null) //If the song is seed, just push this one as well and finish the loop.
        {
            console.log("[LOG] Loading notes of song \"" + base.name + "\"");
            songs.push(base);
            break;
        }
    }
    return base;
}

/**
 * Clears the "based_on" attribute of the individual song pieces.
 */
function clearSongsBasedOn() {
    for (var i = 0; i < songs.length; i++) {
        songs[i].based_on = null;
    }
}

/**
 * Determines the base song and loads all the song pieces into the songs array
 * @param base The loaded song
 */
function determineBaseSongAndLoadSongsIntoSongsArray(base) {
    if (base.based_on == null) {
        console.log("[LOG] Loading notes of song \"" + base.name + "\"");
        songs.push(base);
    }
    else {
        base = loadSongsIntoSongArray(base);
    }
}

/**
 * Grabs the song from the database, then loads it into the songs array as well as determining the seed.
 * @param id
 */
function loadSongsIntoArray(id)
{
    console.log("[LOG] Begin fetching songs...");
    var base;
    base = fetchSongWithXMLHttpRequest(id, base);

    console.log("[LOG] Songs fetched! Processing into song arrays...");

    determineBaseSongAndLoadSongsIntoSongsArray(base);

    seed = base;

    clearSongsBasedOn();

    console.log("[LOG] Processing songs done!");
}

/**
 * Loads the audio resources.
 */
function loadAudioSources()
{
    audioContext = new webkitAudioContext();
    bufferLoader = new BufferLoader(
        audioContext,
        availableInstruments,
        finishedLoading
    );
    bufferLoader.load();
}

/**
 * Gets the max song length in beats.
 * To determine this, it loops through all available instruments of all song pieces
 * and compares the max length with each other.
 */
function getMaxSongLength()
{
    for(var h=0;h<songs.length;h++)
    {
        for(var i=0;i<songs[h].instruments.length;i++)
        {
            for (var j = 0; j < songs[h].instruments[i].notes.length; j++) {
                if (songs[h].instruments[i].notes[j].position > songLength) {
                    songLength = songs[h].instruments[i].notes[j].position;
                }
            }
        }
    }
    songLength++;        //To include the final note
    console.log("[LOG] Song length in beats: " + songLength);
}

/**
 * This function executes once the songs have been loaded.
 * The audio then becomes a sound source and gets put into an array.
 * @param bufferList
 */
function finishedLoading(bufferList)
{
    for(var i=0;i<bufferLoader.urlList.length;i++)
    {
        source[i] = audioContext.createBufferSource(); // creates a sound source
        source[i].buffer = bufferList[i];
    }
}

/**
 * Makes the song advance into the next note.
 * The song resets once we reach the end of the song.
 */
function nextNote() {
    nextNoteTime += (globalNoteSpeed / seed.speed) / 2;    //Basically determines how long the notes last.
    if (++currentNote == songLength) {
        currentNote = 0;
    }
}

/**
 * Plays sound based on the instrument and note index.
 * @param instrumentIndex The index of the instrument layer
 * @param noteIndex The index of the note to play inside above instrument player
 * @param time At what time to play the note.
 * @return {*} The sound to play
 */
function playSound(instrumentIndex, noteIndex, time) {
    var sound = audioContext.createBufferSource();
    sound.buffer = source[instrumenttypes.indexOf(sequencerRenderer.instrumentLayers[instrumentIndex].getAttr("instrumenttype"))].buffer;
    sound.connect(audioContext.destination);
    sound.playbackRate.value = sequencerRenderer.instrumentLayers[instrumentIndex].getAttr("notes")[noteIndex].pitch;
    sound.start(time);
    sound.stop(time + sequencerRenderer.instrumentLayers[instrumentIndex].getAttr("notes")[noteIndex].duration);
    return sound;
}

/**
 * Loops through instruments and notes to determine which note to play,
 * depending on the beat number
 * @param beatNumber The current beat number to play of the song.
 * @param time At what time to play the note.
 */
function playNote( beatNumber, time ) {
    for(var j=0;j<sequencerRenderer.instrumentLayers.length;j++)
    {
        for(var i=0;i<sequencerRenderer.instrumentLayers[j].getAttr("notes").length;i++)
        {
            if(sequencerRenderer.instrumentLayers[j].getAttr("notes")[i].position != beatNumber)
            {
                continue;
            }
            else
            {
                playSound(j, i, time);
                break;
            }
        }
    }
}

/**
 * Schedules notes and plays them, and updates the marker accordingly.
 */
function scheduler() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
        playNote( currentNote, nextNoteTime );
//        if(currentNote != 0)
//            sequencerRenderer.moveMarkers(sequencerRenderer.markerLayer);
//        else
//            sequencerRenderer.resetMarker(sequencerRenderer.markerLayer);
        nextNote();
    }
    timerID = window.setTimeout( scheduler, lookahead );
}

/**
 * Toggles the playing state of the sequencer.
 */
function play() {
    songLength = sequencerRenderer.songLength + 1;

    isPlaying = !isPlaying;

    if (isPlaying) { // start playing
        currentNote = 0;
        nextNoteTime = audioContext.currentTime;
        scheduler();    // kick off scheduling
    } else {
        window.clearTimeout( timerID );
    }
}


/* ************************************************
 Bufferloader class for loading samples
 * ************************************************/

/**
 * The bufferloader class which handles loading instruments into buffers
 * @param context The audiocontext
 * @param urlList The list of URLs for instruments
 * @param callback The callback function to call once loading is done.
 * @constructor
 */
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

/**
 * Loads an individual instrument into the buffer
 * @param url The URL of the instrument
 * @param index The index of the instrument
 */
BufferLoader.prototype.loadBuffer = function (url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    var loader = this;
    request.onload = function () {
        loader.context.decodeAudioData(request.response, function (buffer) {
            if (!buffer) {
                alert('error decoding file data: ' + url);
                return;
            }
            loader.bufferList[index] = buffer;
            if (++loader.loadCount == loader.urlList.length)
                loader.onload(loader.bufferList);
        }, function (error) {
            console.error('decodeAudioData error', error);
        });
    }
    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }
    request.send();
}

/**
 * Loads all the instruments into buffer.
 */
BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
    {
        console.log("[LOG] Loading instrument \"" + availableInstruments[i].instrumenttype + "\"");
        this.loadBuffer("javascript/sequencer/" +this.urlList[i].instrumenturl, i);
    }
}