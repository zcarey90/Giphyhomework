var cars = [
  "Fiat",
  "Mercedes",
  "Tesla",
  "Ford",
  "Toyota",
  "Cheverolet",
  "Bugatti",
  "Lexus",
  "KIA",
  "Volvo"
];

$(document).ready(function() {
  $("#car-button").on("click", callApi);

  $(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      var animatedUrl = $(this).attr("data-animatedUrl");
      $(this).attr("src", animatedUrl);
      $(this).attr("data-state", "animated");
    } else {
      var stillUrl = $(this).attr("data-stillUrl");
      $(this).attr("src", stillUrl);
      $(this).attr("data-state", "still");
    }
  });

  function callApi(event) {
    event.preventDefault();

    var input = $("#car-input").val();

    $.ajax({
      url:
        "https://api.giphy.com/v1/gifs/search?q=" +
        input +
        "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10",
      method: "GET"
    }).done(function(response) {
      $("#view-gif").empty();

      for (var i = 0; i < response.data.length; i++) {
        var animatedUrl = response.data[i].images.fixed_height_small.url;
        var stillUrl = response.data[i].images.fixed_height_small_still.url;
        var rating = response.data[i].rating;
        var carGif = $("<img>");
        var ratingTag = $("<p>");

        ratingTag.text(rating);

        carGif.addClass("gif");
        carGif.attr("src", stillUrl);
        carGif.attr("alt", "image");
        carGif.attr("data-animatedUrl", animatedUrl);
        carGif.attr("data-stillUrl", stillUrl);
        carGif.attr("data-state", "still");

        var carDiv = $("<div>");
        carDiv.append(carGif);
        carDiv.append(ratingTag);

        $("#view-gif").prepend(carDiv);
      }
    });
  }
});
