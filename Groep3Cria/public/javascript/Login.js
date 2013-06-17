function Login() {



    this.loginMain= function()
    {
        loginForm();
    }

    function loginForm() {
        var login = document.getElementById("loginForm");
        var loginBtn = document.getElementById("loginBtn");
        login.appendChild(loginBtn);
        loginPage();
    }


    function loginPage() {
            var account=document.getElementById("account");
            greeting(account);
            inbox(account);
            removeLogin();
            var logoutBtn = document.getElementById("logoutBtn");
            //logoutBtn.addEventListener("click", function () {
                logOut();
           // });
            createButtonsLoggedIn();

    }

    function greeting(parent) {
        var divGreeting= document.createElement("div");
        divGreeting.setAttribute("id", "greeting");
        var greeting = document.createElement("h2");
        var form = document.getElementById("loginForm");
        greeting.appendChild(document.createTextNode("Welcome "+ form.userid.value));
        divGreeting.appendChild(greeting);
        parent.appendChild(divGreeting);
    }

    function inbox(parent){
        var divInbox= document.createElement("div");
        divInbox.setAttribute("id", "inbox");
        var inbox= document.createElement("h2");
        inbox.appendChild(document.createTextNode("Inbox"));
        divInbox.appendChild(inbox);
        parent.appendChild(divInbox);
    }

    function logOut() {

        var form = document.createElement("form");
        form.setAttribute("id", "logoutForm");
        //logoutbutton

    }

    function removeLogin() {

            var account = document.getElementById("account");
            var login = document.getElementById("loginForm");
            account.removeChild(login);

    }

    function createButtonsLoggedIn() {

           var inbox= document.getElementById("inbox");


    }


}