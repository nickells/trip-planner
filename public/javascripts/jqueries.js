console.log("hello your jquery is working")
var dayArray = []
var chosenDay = 1;
dayArray[0] = new thisDay(1);

function thisDay(day){
	this.day= day;
    	// this.hotel = [];
    	this.hotel= [];
    	this.restaurant= [];
    	this.thing= [];
    }

    $('.selectors').on('click','.circleButton', function(){

    	var $thisType = $(this).siblings("select")[0].id;
    	var $thisName = $(this).siblings("select").val();
    	var $thisLocation
	// var $thisLocation = $(this).

	//find data
	var database = '';

	if($thisType ==="hotel"){
		database = all_hotels;
		// if(dayArray[chosenDay-1]["hotel"]){

		// 	$('circleButton#'+dayArray[chosenDay-1]["hotel"][0]).trigger('click')
		// }
		dayArray[chosenDay-1]["hotel"] =[];
	} else if( $thisType ==="restaurant"){
		database = all_restaurants;
	} else {
		database = all_things_to_do;
	}
	// database.name == $thisName;

	//checks for duplicates
	var exist = false;
	dayArray[chosenDay-1][$thisType].forEach(function(element){
		console.log(element)
		if (element == $thisName){
			exist = true; 
		}
	})


	if(!exist){
		console.log(exist);
		dayArray[chosenDay-1][$thisType].push($thisName);
	}

	//get location for google
	database.forEach( function(item){
		if (item.name == $thisName ) {
			$thisLocation = item.place[0].location
		}
	})


	console.log($thisType + ': ' + $thisName + ' at ' + $thisLocation)

	//add data
	addContents($thisType,$thisName);

	//reselect day

	$('.boxHeader>.circleButton:contains('+chosenDay+')').trigger('click');
	//add to map
	var myLatlng = new google.maps.LatLng($thisLocation[0],$thisLocation[1]);
	var newMarker = addMarker(myLatlng,$thisName)



})

$('.boxContents').on('click','.circleButton',function(){
	deleteFromDomAndArray($(this));
})
    //remove item
    function deleteFromDomAndArrayAndMap(button,name,type) {

    	console.log("removed item")
    	var thisName = name || button.siblings('span')[0].textContent;
    	var thisType = type || button.siblings('span')[0].id;
    	console.log("removed item: " + thisName + " and it's a " + thisType);
    	button.parent().slideUp(150, function(){
    		this.remove();
    	}).slideDown();

			//Call delete function
			var elementIndex;
			dayArray[chosenDay-1][thisType].forEach(function(element,index){
				if(element == thisName) {
					elementIndex = index;
					return;
				}
			})
			
			dayArray[chosenDay-1][thisType].splice(elementIndex,1);

	

	};



	//add day
	var day = 1;
	$('.calendar').on('click', '#plus', function(){
		++day
		$(this).before('<div class="circleButton day">'+day+'</div>')
		dayArray[day-1] = (new thisDay(day));
		clearBoxContents();
		updateDay(day);
		repopBoxContents(day);
		chosenDay = day;

	//edit color for the new item
	$(this).last().prev().css({"background":"#66F",
		"color": "white",
		"border": "1px solid #44F"})
	$(this).last().prev().siblings('.day').css({
		"background": "white",
		"border-radius": "200px",
		"color": "gray",
		"border": "1px solid lightgray"
	});
})

	//select day
	$('.calendar').on('click', '.day', function(){
		chosenDay = $(this)[0].textContent;
		updateDay(chosenDay);
		console.log("this day: " + chosenDay)
		clearBoxContents();
		repopBoxContents(chosenDay);

    //color selected button --could use refactoring
    $(this).siblings('.day').css({
    	"background": "white",
    	"border-radius": "200px",
    	"color": "gray",
    	"border": "1px solid lightgray"
    });
    $(this).css({"background":"#66F",
    	"color": "white",
    	"border": "1px solid #44F"})
})

	function clearBoxContents(){
		$('.addPadding').remove()
	}

	function addContents($thisType, $thisName){
		$('.boxContents>#'+ $thisType)
		.after('<div class="addPadding"><span class ="aName" id="'+$thisType+'">' + $thisName +'</span><div class = "circleButton smaller" id="'+ $thisName +'">x</div>' + "</div>");
	}

	function repopBoxContents(day){
		console.log(dayArray[day-1]);

		//create hotel
		dayArray[day-1]["hotel"].forEach(function(hotel){
			addContents("hotel",hotel);
		})

		//creates restaurants
		dayArray[day-1]["restaurant"].forEach(function(restaurant){
			addContents("restaurant",restaurant);
		})

		//creates things to do
		dayArray[day-1]["thing"].forEach(function(things){
			addContents("thing",things);
		})
	}

	//Delete Function


	$('.row').on('click', '.circleButton', function(){
		if(day>1){
			--day;
	//Delete day from the dom
	var dayToDelete = Number($(this).context.id);
	deleteDayElement($(this),dayToDelete);

	//Delete day from Array 
	//This day = next day(if exists)
	deleteFromArray(dayToDelete);
	if($(".boxHeader>.circleButton:contains("+dayToDelete+")")[0]) {
			// console.log($(".boxHeader>.circleButton:contains("+dayToDelete+")")[0])
			$(".boxHeader>.circleButton:contains("+dayToDelete+")").trigger('click');
		}
		else{
			console.log("else caller")
			$(".boxHeader>.circleButton:contains("+")").prev().trigger('click');
		}	
	} else { 
		dayArray[0] = new thisDay(1);
		$(".boxHeader>.circleButton:contains(1)").trigger('click');
	}


});

	function deleteDayElement(button,day){
		// button.prev().trigger("click");
		// $(".boxHeader>.circleButton:contains("+day+")").prev().trigger('click');
		$(".boxHeader>.circleButton:contains(+)").prev().remove();
	}

	function deleteFromArray(day){
		for(var i  = day-1; i<dayArray.length-1; i++ ){
			dayArray[i] = dayArray[i+1];
			dayArray[i].day--;
		}
		dayArray.length= --dayArray.length;
	}

	//Update Day Label 
	function updateDay(day){
		$('.sticker')[0].textContent = ("Day " + day);
		$('.sticker').siblings()[0].id=day;
	}