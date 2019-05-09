// // Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

$(function () {

    // Whenever someone clicks a p tag
  $(document).on("click", "#view-note", function() {
    // Empty the notes from the note section

    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        $("#notes").append("<div class= 'card' style='float: right;'>");
        $("#notes").append("<h3><u>Note<u> <h3>");
        // The title of the article
        $("#notes").append("<h4>" + data.title + "</h4>");
        // An input to enter a new title
        $("#notes").append(
          "<input width='40' id='titleinput' name='title' placeholder='Title Here '> <br>"
        );
        // A textarea to add a new note body
        $("#notes").append(
          "<textarea rows='5' cols='40' id='bodyinput' name='body' placeholder='Text Comments Here'></textarea> <br>"
        );
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append(
          "<button data-id='" +
            data._id +
            "' id='savenote'>Save Note</button>"
        );
        $("#notes").append("</div><hr><hr>");
        // $("#view-note").remove();

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });


  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
        
       
      });

    
        
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  //When you click on the delete button
  $(document).on("click", "#empty", function() {
    event.preventDefault();
    $.ajax({
      url: "/scrape",
      type: "DELETE"
    }).then(function() {
      location.reload();
    });
  });


  //When you click on the Scrape button
  $("#scrape").on("click", function(event) {
    event.preventDefault();
    $.ajax({
      url: "/scrape",
      type: "GET"}).then (function() {
        $.ajax({
          url:'/articles',
          type:'GET'
      })
      .then(article=>{
          if(!article){
              $('.noArticles').text('No Articles Scraped')
          }
          else{
              article.forEach((e,i)=>{
         let title = `<p data-id="${e._id}" style="text-align:center; font-size:30px; font-weight bold"><u>${e.title}<u></p>`;
         let summary = `<h5>${e.summary}</h5>`
         let location = `<h6>${e.location}</h6>`
         let link = `<a style="color:blue; font-size:1em;" href="https://www.indeed.com${e.link}"><u>Job Link<u></a><br><br>`
         let buttnNote = `<button id="view-note" data-id=${
           e._id
         } type="button" class="btn btn-outline-info">View Note</button><hr style="background:white">`
          let notes = `<div id="notes"></div>`


                $("#articles").append(title)
                $("#articles").append(summary)
                $('#articles').append(location)
                $('#articles').append(link)
                $("#articles").append(buttnNote);
                $('#articles').append(notes)
                

              })
              $(".noArticles").empty()
          }
      })

      });
  });
    
});



