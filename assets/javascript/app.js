
var topics = []

function renderButtons() {
    $("#button-area").empty();
    topics.forEach(function(topicEl) {
        newButtonEl=$("<button>");
        newButtonEl.attr("data-topic",topicEl);
        newButtonEl.attr("class","topic-button m-1");
        newButtonEl.text(topicEl);
        $("#button-area").append(newButtonEl)
    })
}

    topics = ["cat","dog","bird","monkey","whale","trek","klingon"]
    renderButtons()

$("#go").on("click",function() {
    var newTopic = $("#text-input").val();
    topics.push(newTopic);
    renderButtons()
})

$(document).on("click",".topic-button",function() {
    $("#gif-area").empty();
    var querryURL = "http://api.giphy.com/v1/gifs/search?q="+$(this).attr("data-topic")+"&api_key=cOPazNJN1DOl7MpWafyWqmA5ZuCR5Rsl&limit=10";
    $.ajax({url:querryURL, method:"GET"}).then(function (response) {
        var result = response.data;
        result.forEach(function(dataElement) {
            var gifDiv = $("<div>");
            gifDiv.attr("class","d-flex flex-column")
            var ratingP = $("<p>Rating: "+dataElement["rating"]+"</p>")
            var gifImg = $("<img>");
            gifImg.addClass("is-gif");
            var fixed_img_url = dataElement["images"]["fixed_height_still"]["url"];
            var gif_img_url = dataElement["images"]["fixed_height"]["url"];
            gifImg.attr("data-fixed",fixed_img_url);
            gifImg.attr("data-run",gif_img_url);
            gifImg.attr("data-is-running",false);
            gifImg.attr("src",fixed_img_url);
            $(gifDiv).append(ratingP).append(gifImg);
            $("#gif-area").append(gifDiv);
        })
    })
})

$(document).on("click",".is-gif",function() {
    console.log(this);
    if($(this).attr("data-is-running")==="true") {
        $(this).attr("data-is-running","false")
        var fixed_url = $(this).attr("data-fixed")
        $(this).attr("src",fixed_url);
    } else {
        $(this).attr("data-is-running","true")
        var running_url = $(this).attr("data-run")
        $(this).attr("src",running_url);
    }
})