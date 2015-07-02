console.log("hello your jquery is working")
var dayArray = []
var chosenDay = 1;
dayArray[0] = new thisDay(1);

function thisDay(day){
    	this.day= day;
    	this.hotel= undefined;
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
		dayArray[chosenDay-1]["hotel"] =  $thisName;
	} else if( $thisType ==="restaurant"){
		database = all_restaurants;
	    dayArray[chosenDay-1][$thisType].push($thisName);

	} else {
		database = all_things_to_do;
	    dayArray[chosenDay-1][$thisType].push($thisName);
	}
	// database.name == $thisName;
	database.forEach( function(item){
		 if (item.name == $thisName ) {
		 	 $thisLocation = item.place[0].location
			}
		})
	console.log($thisType + ': ' + $thisName + ' at ' + $thisLocation)

	//add data
	addContents($thisType,$thisName);

	//add to map
    var myLatlng = new google.maps.LatLng($thisLocation[0],$thisLocation[1]);
    var newMarker = addMarker(myLatlng,$thisName)



})
    //remove item
$('.boxContents').on('click','.circleButton',function(){
	console.log("removed item")
	$(this).parent().slideUp(150, function(){
		this.remove();
	}).slideDown();

	//Call delete function
})

	//add day
var day = 1;
$('.calendar').on('click', '#plus', function(){
	++day
	$(this).before('<div class="circleButton day">'+day+'</div>')
    dayArray[day-1] = (new thisDay(day));
    clearBoxContents();
    updateDay(day);
    repopBoxContents(day);
})

	//select day
$('.calendar').on('click', '.day', function(){
	chosenDay = $(this)[0].textContent;
	updateDay(chosenDay);
	clearBoxContents();
    repopBoxContents(chosenDay);
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
		$('.boxContents #'+ $thisType).after('<div class="addPadding">' + $thisName +'<div class = "circleButton smaller">x</div>' + "</div>");
	}

	function repopBoxContents(day){
		console.log(dayArray[day-1]);

		//create hotel
		var hotelToAdd = dayArray[day-1]["hotel"];
		if (hotelToAdd) addContents("hotel",hotelToAdd);

		//creates restaurants
		dayArray[day-1]["restaurant"].forEach(function(restaurant){
			addContents("restaurant",restaurant);
		})

		//creates things to do
		dayArray[day-1]["thing"].forEach(function(restaurant){
			addContents("thing",restaurant);
		})
	}

	//Delete Function

	function deleteDayElement(){

	}

	//Update Day Label 
	function updateDay(day){
		$('.sticker')[0].textContent = ("Day " + day)
	}