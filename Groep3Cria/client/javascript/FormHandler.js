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
    $('#saveNewUserForm').submit(function (e) {

        $('#btnSave').toggleClass("disabled");
        var $form = $(this);
        var data = $form.serializeFormJSON();
        // the third parameter is optional and is used to capture the return value when you use SimpleAnsweringServer
        io.post("saveNewUser", data, function (response) {
            that.saveReady(response);
        });
        e.preventDefault();
    });

  
}());

