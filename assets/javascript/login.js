$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCY2HLlP0XCW8QMdGiTcvH9z-KIn-YW7sM",
        authDomain: "project1-f7c4f.firebaseapp.com",
        databaseURL: "https://project1-f7c4f.firebaseio.com",
        projectId: "project1-f7c4f",
        storageBucket: "project1-f7c4f.appspot.com",
        messagingSenderId: "385049691199"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
    const auth = firebase.auth();

    // user name login
    $(document).on("click", "#login", function () {

        const email = $("#email-login").val().trim();
        const password = $("#password-login").val().trim();
        const promise = auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            console.log("error with sign in:" + error);
            $('#modal').modal('open');
        });
        promise.catch(e => console.log(e.message));
    });

    $(document).on("click", "#create", function () {

        const email = $("#email-create").val().trim();
        const password = $("#password-create").val().trim();
        const repassword = $("#repassword-create").val().trim();

        if (password === repassword) {

            const promise = auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                console.log("error with creation:" + error);
                $('#modal').modal('open');
            });

            auth.onAuthStateChanged(User => {

                if (User) {
                    var userEmail = User.email
                    var uid = User.uid
                    database.ref('users/' + uid).set({
                        userEmail: userEmail,
                        uid: uid,
                    });
                } else {
                    console.log("not logged in")
                    $('#modal').modal('open');
                };
            });

        } else {
            console.log("passwords do not match")
            $('#modal').modal('open');
        }
        promise.catch(e => console.log(e.message));
    });

    $(document).on("click", "#create-account", function () {
        location.href = "create.html"
    });

    auth.onAuthStateChanged(User => {
        if (User) {
            location.href = "../index.html";
        } else {
            console.log("not logged in");
        };
    });
    $('#modal').modal()
    $(".dropdown-trigger").dropdown();
});