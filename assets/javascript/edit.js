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
    var uid
    var userEmail
    auth.onAuthStateChanged(User => {
        if (User) {
            var userEmail = User.email
            var uid = User.uid
            var notes = {}
            database.ref('users/' + uid).set({
                userEmail: userEmail,
                uid: uid,
                notes: notes
            })
        } else {
            location.href = "login.html"
        }
    })
    $(document).on("click", "#save", function () {
        // push data to firebase
        var noteContent = $(".note-content").val().trim()
        auth.onAuthStateChanged(User => {
            database.ref('users/' + User.uid).push({
                noteContent: noteContent
            })
        })
    })
    // appends the notes name to the header, change 'name goes here' to name variable from database 
    $("#note-name").prepend("<a href='#' class='brand-logo ml-5 center nav nav-text'>" + 'name goes here' + "</a>")
    // needed to allow for materialize input for mobile(see materialize/text-inputs on website)
    // add this line everytime after jQuery change the textarea's $('#textarea1').val()
    M.textareaAutoResize($('#textarea1'));
    // sign out if logged in, auth.onAuthStateChanged above will automatically redirect to login
    $(document).on("click", "#logout", function () {
        firebase.auth().signOut()
    })
})