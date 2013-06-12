/**
 * Created with JetBrains PhpStorm.
 * User: Mike
 * Date: 30-5-13
 * Time: 13:35
 * To change this template use File | Settings | File Templates.
 */

function Note(position, pitch, volume, noteLength) {
    this.position = position;
    this.pitch = pitch;
    this.volume = volume;
    this.noteLength = noteLength;
}

Note.prototype.clickNote = function() {
    //TODO add shit
}
