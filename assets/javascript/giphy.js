
$(function(){
	renderButtons(tvShows, 'tvShowName', '#tvShowButtons');
});

var tvShows = ["Gangs of New York", "Bronx Tale", "Mad Men", "Moonstruck", "Coming to America", "The Producers", "City Island", "The Wolf of Wall Steet", "The Age of Innocence", "Annie Hall"];


 
function renderButtons(arrayToUse, classToAdd, areaToAddTo){
	$(areaToAddTo).empty();

	for(var i=0; i<arrayToUse.length; i++){
		var a = $('<button>')
		a.addClass(classToAdd);
		a.addClass('btn btn-default btn-lg');
		a.attr('type', 'button');
		a.attr('data-name', arrayToUse[i]);
		a.text(arrayToUse[i]);
		$(areaToAddTo).append(a);
	}
}


$('#addTVShow').on('click', function(){
	var newShow = $('#tvShow-input').val().trim();
	$('#tvShow-input').val("");
	tvShows.push(newShow);
	renderButtons(tvShows, 'tvShowName', '#tvShowButtons');
	return false;
});

$(document).on('click', '.tvShowName', function(){
	$('#tvShows').empty();
	$('.tvShowName').removeClass('active');
	$(this).addClass('active');

	var show = $(this).data('name');
	console.log('show', show);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=12&offset=12";

	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	.done(function(response) {
		console.log('response ', response)

		var results = response.data;

		for(var i=0; i < results.length; i++) {
			var tvShowDiv = $('<div class="tv-item col-sm-3">');
			var rating = results[i].rating;

			var p = $('<h1>').text("Rating: " + rating);
			p.addClass('rating');
			var animated = results[i].images.fixed_height.url;
			var still = results[i].images.fixed_height_still.url;

			var tvShowImage = $('<img>');
			tvShowImage.addClass('img-responsive');
			tvShowImage.attr('src', still);
			tvShowImage.attr('data-still', still);
			tvShowImage.attr('data-animate', animated);
			tvShowImage.attr('data-state', 'still');
			tvShowImage.attr('id', "tvShow-" + [i]);
			tvShowImage.addClass('tvShowImage');

			tvShowDiv.append(p)
			tvShowDiv.append(tvShowImage)

			$('#tvShows').append(tvShowDiv);
		}
	});
});

$(document).on('click', '.tvShowImage', function(){
	var state = $(this).attr('data-state');

	if(state == 'still'){
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	} else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
});