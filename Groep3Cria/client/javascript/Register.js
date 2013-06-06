function Register(){


    this.registerForm = function(){
        alert("hoi1");
        $('btnSaveUser').click(function (e) {
            alert("hoi");
            // custom handling here
            e.preventDefault();
        });
    }
}