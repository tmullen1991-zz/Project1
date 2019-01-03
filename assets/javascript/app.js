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
    // used to client has authentication, if so pull user data from firebase, else redirect to login/create
    const auth = firebase.auth();
    auth.onAuthStateChanged(User => {
        if (User) {
        } else {
            location.href = "pages/login.html"
        };
    });
    // sign out if logged in, auth.onAuthStateChanged above will automatically redirect to login
    $(document).on("click", "#logout", function () {
        firebase.auth().signOut();
    });
    $('.modal').modal();
    // add note name to database from modal
    $(document).on("click", "#add", function () {
        var fileName = $("input").val().trim()
        auth.onAuthStateChanged(User => {
            database.ref('users/' + User.uid).child(fileName).set({
                // set initial note content to a blank string in firebase
                noteContent: ""
            });
        });
    });
    // store the file clicked on into a reference object in firebase, this allows the edit.html page to know what file data to load
    $(document).on("click", ".file-name", function () {
        var currentFile = $(this).text();
        auth.onAuthStateChanged(User => {
            database.ref('users/' + User.uid).child("load-data").set({
                currentFile: currentFile
            });
        });
        location.href = "pages/edit.html"
    });
});
