var currentFile;
var currentFileContent;

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
            // load the file cliked on from index.html from firebase
            var loadFile = database.ref('users/' + User.uid + "/load-data/currentFile")
            loadFile.once('value', function (snapshot) {
                currentFile = snapshot.val();
                // add note name to page title
                $("#note-name").prepend("<a href='#' class='brand-logo ml-5 center nav nav-text'>" + currentFile + "</a>")
                database.ref('users/' + User.uid + "/note-list/" + currentFile).on("child_added", function (childSnapshot) {
                    // add note text to input area, otherwise add label to prompt user to enter info
                    if (childSnapshot.val() !== "") {
                        currentFileContent = childSnapshot.val();
                        $(".note-content").text(currentFileContent);
                    } else {
                        $("#text-label").append("Add Stuff to Remember Here :)")
                    }
                }, function (errorObject) {
                    console.log("Errors handled: " + errorObject.code);
                });
            });
        } else {
            location.href = "login.html";
        };
    });

    $(document).on("click", "#save", function () {
        // store note content in variable
        currentFileContent = $(".note-content").val().trim();
        auth.onAuthStateChanged(User => {
            database.ref('users/' + User.uid).on("child_added", function (childSnapshot) {
                // save the child/path name to be saved under (the note name) into a variable 
                var currentFile = childSnapshot.val().currentFile;
                if (currentFile !== undefined) {
                    // store the text into an object under the currentFile name in firebase
                    database.ref('users/' + User.uid + "/note-list").child(currentFile).set({
                        noteContent: currentFileContent
                    });
                    addSaveToDrive();
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

function addSaveToDrive() {
    var blob = new Blob([currentFileContent], { type: "text/plain" })
    var url = window.URL.createObjectURL(blob);
    const srcAttributeName = "data-src";
    const fileAttributeName = "data-filename"
    $("#driveButton").attr(srcAttributeName, url);
    $("#driveButton").attr(fileAttributeName, currentFile);
    console.log(srcAttributeName + ": " + $("#driveButton").attr(srcAttributeName));
    // $.getScript("https://apis.google.com/js/platform.js");
}