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

var globalNoteSpeed = notes.EighthNote;

var audioContext = null;
var isPlaying = false;		// Are we currently playing?
var startTime;				// The start time of the entire sequence.
var currentNote;		// What note is currently last scheduled?
var lookahead = 75.0;		// How frequently to call scheduling function 
							//(in milliseconds)
var scheduleAheadTime = 0.1;	// How far ahead to schedule audio (sec)
							// This is calculated from lookahead, and overlaps 
							// with next interval (in case the timer is late)
var nextNoteTime = 0.0;		// when the next note is due.
var timerID = 0;			// setInterval identifier.

var songLength = 0;		//in beats

var source = [];		//The instruments

 var availableInstruments = [
 {instrumenttype: "Bass", instrumenturl: "audio/bass.wav"},
 {instrumenttype: "Bongo", instrumenturl: "audio/bongo.wav"},
 {instrumenttype: "Cannon", instrumenturl: "audio/cannon.wav"},
 {instrumenttype: "Hi-hat", instrumenturl: "audio/hihat.wav"},
 {instrumenttype: "Distortion Guitar", instrumenturl: "audio/distortionguitar.wav"},
 {instrumenttype: "Guitar", instrumenturl: "audio/guitar.wav"},
 {instrumenttype: "Kick", instrumenturl: "audio/kick.wav"},
 {instrumenttype: "Orchestra Hit", instrumenturl: "audio/orchestra hit.wav"},
 {instrumenttype: "Piano", instrumenturl: "audio/piano.wav"},
 {instrumenttype: "Snare Drum", instrumenturl: "audio/snare.wav"},
 {instrumenttype: "Trap", instrumenturl: "audio/trap.wav"},
 {instrumenttype: "Xylophone 2", instrumenturl: "audio/xylophone (2).wav"},
 {instrumenttype: "Xylophone 3", instrumenturl: "audio/xylophone.wav"},
 {instrumenttype: "Xylophone", instrumenturl: "audio/xylophone (3).wav"}
 ];

var instrumenttypes = []; //The array of instrument names

var songs = []; //The array of related songs

var seed; //The seed song to extract the basic song info from.

window.addEventListener("load", init );

function init() {
	try {
		console.log("[LOG] Initializing resources...");
		loadAudioSources();
		
		var http = new XMLHttpRequest();

        loadSongsIntoArray("Remember me V2");

		getMaxSongLength();
		
		//drawGUI();
		
		sequencerRenderer.init(0,0, songs);
		
		console.log("[LOG] Done!");
	}
	catch(e) {
		alert(e);
		alert('Web Audio API is not supported in this browser');
	}
}

function loadSongsIntoArray(songname)
{	
	console.log("[LOG] Begin fetching songs...");
	var base;

	var http = new XMLHttpRequest();

	var url = "/song/" + songname;
	http.open("GET", url, false);
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			base = JSON.parse(http.responseText);
			base = base.songs;
		}
	}
	http.send(null);
	
	console.log("[LOG] Songs fetched! Processing into song arrays...");
	//Now we got the songs.

	if(base.based_on == null)
	{
		console.log("[LOG] Loading notes of song \"" + base.name + "\"");
		songs.push(base);
	}
	else
	{
		while(base.based_on != null)
		{
			console.log("[LOG] Loading notes of song \"" + base.name + "\"");
			songs.push(base);
			base = base.based_on;
			if(base.based_on == null) //If the song is seed, just push this one as well and finish the loop.
			{
				console.log("[LOG] Loading notes of song \"" + base.name + "\"");
				songs.push(base);
				break;
			}
		}
	}
	seed = base;
	
	for(var i=0;i<songs.length;i++)
	{
		songs[i].based_on = null;
	}
		console.log(songs);	
	console.log("[LOG] Processing songs done!");
}

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

function drawGUI()
{
	playbutton = document.createElement("span");
	playbutton.appendChild(document.createTextNode("Play"));
	playbutton.addEventListener("click", play );
	document.body.appendChild(playbutton);
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createTextNode("Song: "));
	document.body.appendChild(document.createTextNode(songs[0].name));
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createTextNode("Tree depth: "));
	document.body.appendChild(document.createTextNode(songs.length));
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createTextNode("BPM: "));
	document.body.appendChild(document.createTextNode(seed.speed));
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createTextNode("Branch structure: "));
	document.body.appendChild(document.createElement("br"));
	for(var i=songs.length-1;i>=0;i--)
	{
		document.body.appendChild(document.createTextNode(songs[i].name));
		document.body.appendChild(document.createTextNode(" + (" + i + ") -> "));
	}
}

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
	songLength++;		//To include the final note
	console.log("[LOG] Song length in beats: " + songLength);
}

function finishedLoading(bufferList)
{
	for(var i=0;i<bufferLoader.urlList.length;i++)
	{
		source[i] = audioContext.createBufferSource(); // creates a sound source
		source[i].buffer = bufferList[i];		
	}
}

function nextNote() {
    nextNoteTime += (globalNoteSpeed / seed.speed) / 2;	//Basically determines how long the notes last.
    if (++currentNote == songLength) {
        currentNote = 0;

    }
}

function playNote( beatNumber, time ) {

    for(var i=0;i<availableInstruments.length;i++)
    {
        instrumenttypes.push(availableInstruments[i].instrumenttype);
    }

	for(var j=0;j<sequencerRenderer.instrumentLayers.length;j++)
	{
		for(var i=0;i<sequencerRenderer.instrumentLayers[j].getAttr("notes").length;i++)
		{
			console.log(sequencerRenderer.instrumentLayers[0].attrs.notes);
			if(sequencerRenderer.instrumentLayers[j].getAttr("notes")[i].position != beatNumber)
				continue;
			else
			{
				var sound = audioContext.createBufferSource();
				sound.buffer = source[instrumenttypes.indexOf(sequencerRenderer.instrumentLayers[j].getAttr("instrumenttype"))].buffer;
				sound.connect(audioContext.destination);
				sound.playbackRate.value = sequencerRenderer.instrumentLayers[j].getAttr("notes")[i].pitch;
				// TODO: Once start()/stop() deploys on Safari and iOS, these should be changed.
				sound.start( time );
				sound.stop( time + sequencerRenderer.instrumentLayers[j].getAttr("notes")[i].duration );
				break;
			}
		}
	}
}

function scheduler() {
	// while there are notes that will need to play before the next interval, 
	// schedule them and advance the pointer.
	while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
		playNote( currentNote, nextNoteTime );
		if(currentNote != 0)
			sequencerRenderer.moveMarkers(sequencerRenderer.markerLayer);
		else
			sequencerRenderer.resetMarker(sequencerRenderer.markerLayer);
		nextNote();
	}
	timerID = window.setTimeout( scheduler, lookahead );
}

function play() {
	isPlaying = !isPlaying;

	if (isPlaying) { // start playing
		currentNote = 0;
		nextNoteTime = audioContext.currentTime;
		scheduler();	// kick off scheduling
		return "stop";
	} else {
		window.clearTimeout( timerID );
		return "play";
	}
}


/* ************************************************
     Bufferloader class for loading samples
 * ************************************************/

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}
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
BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
    {
	console.log("[LOG] Loading instrument \"" + availableInstruments[i].instrumenttype + "\"");
        this.loadBuffer(this.urlList[i].instrumenturl, i);
    }
}