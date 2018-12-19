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

    var noteContent
    $(document).on("click", "#save", function () {
        // push data to firebase
        noteContent = $(".note-content").val().trim()
        
    })
    // appends the notes name to the header, change 'name goes here' to name variable from database 
    $("#note-name").prepend("<a href='#' class='brand-logo note-name right ml-5'>" + 'name goes here' + "</a>")

})