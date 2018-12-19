$(document).ready(function () {
    var noteContent
    //firebase stuff here
    $(document).on("click", "#save", function () {
        // push data to firebase
        noteContent = $(".note-content").val().trim()
    })
    // appends the notes name to the header, change 'name goes here' to name variable from database 
    $("#note-name").prepend("<a href='#' class='brand-logo note-name right ml-5'>" + 'name goes here' + "</a>")
    
})