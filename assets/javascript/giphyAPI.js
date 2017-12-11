var topics = ["Mouse", "Lion", "Polar Bear"];
//var animalAnimal = "";

$(".add").on("click", function(event){
  event.preventDefault();
  var $animal = $(".addAnimal").val().trim();
  var animalAnimal = $animal.charAt(0).toUpperCase() + $animal.slice(1);
  console.log(animalAnimal)
  topics.push(animalAnimal)
  console.log("inside of oclick topics ", topics)
  createButton();
  //return topics
});//end of onclick for add button

function createButton() {
  $(".animalsDiv").empty();
  $.each(topics, function(i, term) {
    var $buttonForAnimal = $("<button/>");
    $buttonForAnimal.addClass("btn btn-info animals")
    $buttonForAnimal.text(term);
    $(".animalsDiv").append($buttonForAnimal)
  }); //end of creating a button for a new added animal
}
createButton();

$(document).on("click", "button.animals",function(){
  $(".giphyDiv").empty();
  var animalClicked = $(this).text()
  animalClicked = animalClicked.toLowerCase()
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animalClicked + "/limit=10&api_key=z5sRqMIBVXE53YY9fknzY9Av6wAOzSXR&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
     response.data.forEach((giphy) => {
       console.log(giphy)
       var eachGiphyDiv = $('<div class="gif">') //creat for each gif its div
       var rating = giphy.rating //take ratings from each gif
       var $pRating = $('<p class="rating">') //creat a p element for the rating
       $pRating.text("Rating: " + rating)//put rating inside of p element as text
       var $imgGif = $('<img class="conditions">')
       $imgGif.attr("src", giphy.images.fixed_height_still.url)
       $imgGif.attr("data-active", giphy.images.fixed_height.url)
       $imgGif.attr("data-still", giphy.images.fixed_height_still.url)
       $imgGif.attr("data-state", "still")
       eachGiphyDiv.append($pRating)
       eachGiphyDiv.append($imgGif)
       $(".giphyDiv").append(eachGiphyDiv)
     }); //end for each loop
  }); //end of done function
}); // end of button.animals onclick function


$(document).on("click", "img.conditions",function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-active"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
