
var animalGifs = {

	
	animalsToStart: ["elephant", "goat", "whale", "bigfoot", "lochness", "alf", "clifford", "dolphin", "squirrel", "t-rex",],

	
	createButtons: function(){

		$('#animalButtons').empty();

		
		for (var i = 0; i < this.animalsToStart.length; i++){
			var newBtn = $('<button>')
			.addClass('aniBtnClick')
			.attr('data-animal-type', this.animalsToStart[i])
			.text(this.animalsToStart[i]);

			$('#animalButtons').append(newBtn);
		}

	},

	
	addAnimalsToArr: function(query){

		this.animalsToStart.push(query);
		console.log(this.animalsToStart);
		this.createButtons();

	},

	
	sendToGiphy: function(animal){
		$.ajax({

			url: "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10",
			method: "GET"
		})
		.done(function(response){
			console.log(response);

			var results = response.data;

			$('#animals').empty();

			for (var i = 0; i < results.length; i++){

				var dataStillURL = results[i].images.fixed_height_still.url;
				var imgUrl = results[i].images.fixed_height.url;

				var p = $('<p>');
				p.text("Rating: " + results[i].rating);

				var animalImage = $('<img>')
				.addClass('gif')
				.attr('data-still', dataStillURL)
				.attr('data-animate', imgUrl)
				.attr('data-state', "animate")
				.attr('src', imgUrl);

    			$('#animals').append(p).append(animalImage);

			}

		});
	},

	
	changeState: function(self){

		var state = self.attr('data-state');
		var animate = self.attr('data-animate');
		var still = self.attr('data-still');

		if (state === "animate"){

			self.attr('data-state', "still");
			self.attr('src', still);
		}

		else if ( state === "still"){

			self.attr('data-state', "animate");
			self.attr('src', animate);
		}

		else {
			console.log("Dawg, IDK how this happened but you got an error");
		}

	}

};

$(document).ready(function(){

	
	animalGifs.createButtons();

	
	$(document).on('click', '.aniBtnClick', function(){

		var q = $(this).attr('data-animal-type');
		animalGifs.sendToGiphy(q);
		console.log("this btn still works");

	});

	
	$(document).on('click', '.gif', function(){

		var self = $(this);
		animalGifs.changeState(self);

	});

	
	$('#addAnimal').on('click', function(e){

		var query = $('#animalInput').val();

		animalGifs.addAnimalsToArr(query);

		e.preventDefault();
		
	});

});