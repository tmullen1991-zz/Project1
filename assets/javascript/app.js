$(document).ready(function () {
    var noteContent
    //firebase stuff here
    $(document).on("click", "#save", function () {
        // push data to firebase
        noteContent = $("#note-content").val().trim()
    })
    // appends the notes name to the header, change 'name goes here' to name variable from database 
    $("#note-name").prepend("<a href='#'' id='note-name' class='brand-logo right'>" + 'name goes here' + "</a>")
    
})