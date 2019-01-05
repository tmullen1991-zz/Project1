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

    // load users data from firebase
    auth.onAuthStateChanged(User => {
        if (User) {

            // load the file cliked on from index.html from firebase
            var loadFile = database.ref('users/' + User.uid + "/load-data/currentFile")
            loadFile.once('value', function (snapshot) {

                var currentFile = snapshot.val();
                // add note name to page title

                $("#note-name").prepend("<a href='#' class='brand-logo ml-5 center nav nav-text'>" + currentFile + "</a>")
                database.ref('users/' + User.uid + "/note-list/" + currentFile).on("child_added", function (childSnapshot) {
                    // add note text to input area, otherwise add label to prompt user to enter info

                    if (childSnapshot.val() !== "") {
                        $(".note-content").text(childSnapshot.val());
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

    // save and store note content into firebase under specific user object
    $(document).on("click", "#save", function () {

        // store note content in variable
        var noteContent = $(".note-content").val().trim();
        auth.onAuthStateChanged(User => {

            database.ref('users/' + User.uid).on("child_added", function (childSnapshot) {

                // save the child/path name to be saved under (the note name) into a variable 
                var currentFile = childSnapshot.val().currentFile;

                if (currentFile !== undefined) {
                    // store the text into an object under the currentFile name in firebase

                    database.ref('users/' + User.uid + "/note-list").child(currentFile).set({
                        noteContent: noteContent,
                    });

                };
            }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });
        });
    });

    // click event for taking highlighted word and passing it to APIs
    $(document).on("click", "#define", function () {
        $(".define-result").empty()
        $(".synonym-result").empty()

        // selectionstart will not work with jquery $("textarea1").val(), use document.getElementById
        var noteContent = document.getElementById("textarea1");
        var start = noteContent.selectionStart;
        var end = noteContent.selectionEnd;
        var word = noteContent.value.substring(start, end);

        // get defintion from Merriam-Webster 
        $.getJSON('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=ecddfe40-0ee7-4b86-9e13-49ff7a01320a', function (data) {

            var definitonArr = data[0].shortdef;
            $(".define-result").html("<h6>" + word + " definiton from Merriam-Webster: </h6>")
            
            if (definitonArr === undefined) {
                $(".define-result").append("Definiton not found :(")
            } else {
                for (i = 0; i < definitonArr.length; i++) {
                    $(".define-result").append((i + 1) + ". " + definitonArr[i] + "<br>")
                }
            }
        });
    })

    $(document).on("click", "#getSynonyms", function () {
        $(".synonym-result").empty()
        $(".define-result").empty()

        // selectionstart will not work with jquery $("textarea1").val(), use document.getElementById
        var noteContent = document.getElementById("textarea1");
        var start = noteContent.selectionStart;
        var end = noteContent.selectionEnd;
        var word = noteContent.value.substring(start, end);

        // get synonyms from Oxford
        $.ajax({
            url: 'http://CrossOriginGateway.test/cors-pass-through',
            type: 'POST',
            data: { 
                url: "https://od-api.oxforddictionaries.com/api/v1/entries/en/" + word + "/synonyms", 
                headers: {	
                    "app_id": "404cd1ec",
                    "app_key": "5e565b1dad5419817023545079ef25bb"
                }
            },
            success: function (data){
                var synonymArr = data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
                $(".synonym-result").html("<h6>" + word + " synonyms from Merriam-Webster: </h6>")
                if (synonymArr === undefined) {
                    $(".synonym-result").append("Definiton not found :(")
                } else {
                    for (i = 0; i < synonymArr.length; i++) {
                        $(".synonym-result").append((i + 1) + ". " + synonymArr[i].text + "<br>")
                    }
                }
            },
            error: function (data){
        
            }
        
        });
    })

    // materialize script
    M.textareaAutoResize($('#textarea1'));
    $(".dropdown-trigger").dropdown();
    $('.modal').modal();

    // sign out if logged in, auth.onAuthStateChanged above will automatically redirect to login
    $(document).on("click", "#logout", function () {
        firebase.auth().signOut();
    });
});