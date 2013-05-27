/**
 * The FormHandler servers as an Immediately-invoked Function Expression. This way we can embed
 * the jQuery event handlers in a class and be dependent on SocketIOConnector.
 *
 * @see http://benalman.com/news/2010/11/immediately-invoked-function-expression/
 */
(function FormHandler() {
    var io = new SocketIOConnector(this);
    var that = this;

    /**
     * When the form is submitted it gets serialized to JSON and sent to the backend using the SocketIOConnector.
     */
    $('#saveNewPlayerForm').submit(function (e) {

        $('#btnSave').toggleClass("disabled");
        var $form = $(this);
        var data = $form.serializeFormJSON();
        // the third parameter is optional and is used to capture the return value when you use SimpleAnsweringServer
        io.post("saveNewPlayer", data, function (response) {
            that.saveReady(response);
        });
        e.preventDefault();
    });

    /**
     * Only called when you use the SimpleServer.js or Server.js
     */
    this.saveReady = function (response) {
        $('#btnSave').toggleClass("disabled");
        $(function () {
            $('<div id="saveConfirmation" title="Saved"><p>Player ' + response.name + ' saved</p></div>').appendTo("body");
            $("#saveConfirmation").dialog({close: function (event, ui) {
                $("#saveConfirmation").remove()
            }});
        });
    }

    /**
     * Just some jQuery magic because I was to lazy to type eleven option elements
     */
    $(document).ready(function () {
        for (var i = 1; i <= 11; i++) {
            $('#playerNumber').append('<option value="' + i + '">' + i + '</option>');
        }
    });
}());

