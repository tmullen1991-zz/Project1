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
            var loadFile = database.ref('users/' + User.uid + "/load-data/currentFile")
            loadFile.once('value', function (snapshot) {
                var currentFile = snapshot.val();
                $("#note-name").prepend("<a href='#' class='brand-logo ml-5 center nav nav-text'>" + currentFile + "</a>")

                database.ref('users/' + User.uid + "/" + currentFile).on("child_added", function (childSnapshot) {
                    if (childSnapshot.val() !== "") {
                        $(".note-content").append(childSnapshot.val());
                    } else {
                        $("#text-label").append("Add Stuff to Remember Here :)")
                    }
                    console.log(childSnapshot.val())
                }, function (errorObject) {
                    console.log("Errors handled: " + errorObject.code);
                });
            });
        } else {
            location.href = "login.html";
        };
    });

    $(document).on("click", "#save", function () {
        // push data to firebase
        var noteContent = $(".note-content").val().trim();
        auth.onAuthStateChanged(User => {
            database.ref('users/' + User.uid).on("child_added", function (childSnapshot) {
                // save the child/path name to be saved under (the note name) into a variable 
                var currentFile = childSnapshot.val().currentFile;
                if (currentFile !== undefined) {
                    // store the text into an object under the currentFile name in firebase
                    database.ref('users/' + User.uid +"/noteList").child(currentFile).set({
                        noteContent: noteContent
                    });
                };
            }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
        });
    });

    M.textareaAutoResize($('#textarea1'));
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();
    // sign out if logged in, auth.onAuthStateChanged above will automatically redirect to login
    $(document).on("click", "#logout", function () {
        firebase.auth().signOut();
    });
});