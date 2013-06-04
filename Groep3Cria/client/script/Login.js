function Login() {


    var loggedIn = false;

    this.loginMain= function()
    {
        loginForm();
    }

    function loginForm() {
        var login = document.getElementById("loginForm");
        var loginBtn = document.getElementById("loginBtn");
        loginBtn.addEventListener("click", function () {
            checkCredentials();
        });
        login.appendChild(loginBtn);
    }

    function checkCredentials() {
        var form = document.getElementById("loginForm");
        if (form.userid.value == "admin" && form.pswrd.value == "123") {
            loggedIn = true;
            loginPage();
        }
        else {
            alert("Error Password or Username")
            clearInlog();
        }
    }

    function clearInlog(){
        //empty the passw en userid text
    }

    function loginPage() {
        if (loggedIn == true) {
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
        loggedIn = false;
        var form = document.createElement("form");
        form.setAttribute("id", "logoutForm");
        //logoutbutton

    }

    function removeLogin() {
        if (loggedIn == true) {
            var account = document.getElementById("account");
            var login = document.getElementById("loginForm");
            account.removeChild(login);
        }
    }

    function createButtonsLoggedIn() {
        if (loggedIn == true) {
           var inbox= document.getElementById("inbox");

        }
    }


}