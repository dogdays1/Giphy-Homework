//javascript


$(document).ready(function () {
    console.log("ready!");
    var choice;
    var parks = ["Yosemite", "Grand Canyon", "Yellowstone", "Badlands", "Haleakala", "Death Valley"];
    // var strgfy;
    makeButtons();

    $(document).on("click", ".parkBtn", function () {
        choice = $(this).attr("parkName");
        console.log(choice);
        // strgfy = JSON.stringify(choice);
        //console.log(strgfy);
        // callAjax();

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + choice + "+National+Park&rating=pg&api_key=TFzuVpZBZyCyuKYyH0mLFm6iG1vQPCU3&limit=10";

        //function callAjax() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".test").empty();
            console.log(queryURL);
            console.log(response);

            for (var i = 0; i < 10; i++) {
                var imgURL = response.data[i].images.fixed_width_still.url;
                var imgURL2 = response.data[i].images.fixed_width.url;
                var rating = response.data[i].rating;
                var image = $("<img>").attr("src", imgURL).attr("data-still", imgURL).attr("data-move", imgURL2).attr("data-state", "still").attr("class", "gif").attr("data-rating", rating);
               $(".test").append(image).append("rating: " + rating);

            };

        })


    });
    //}
    $(document).on("click", ".gif", function () {
        console.log("click!");
        var q = $(this).attr("data-state");
        if (q === "still") {
            $(this).attr("src", $(this).attr("data-move"));
            $(this).attr("data-state", "move");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });



    $("#findPark").on("click", function (event) {
        event.preventDefault();
        var pName = $("#userPark").val().trim();
        console.log(pName);
        parks.push(pName);
        $("#userPark").val("");
        makeButtons();
    });



    function makeButtons() {
        $("#buttons").empty();
        for (var i = 0; i < parks.length; i++) {
            var btn = $("<button type='button' class='btn btn-primary'>");
            btn.attr("parkName", parks[i]);
            btn.addClass("parkBtn");
            btn.text(parks[i]);
            $("#buttons").append(btn);
            console.log(parks[i]);
            {/* <button type="button" class="btn btn-primary">Primary</button> */ }
        }
    }


});



