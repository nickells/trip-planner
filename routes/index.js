var express = require('express');
var router = express.Router();
var models = require('../models/index')
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;
var Promise = require('bluebird')


/* GET home page. */

router.get('/', function(req,res,next){
	Promise.all([Hotel.find({}).exec(),Restaurant.find({}).exec(),ThingToDo.find({}).exec()])
	.spread(function(hotels,restaurants,thingsToDo){
		// var selectedHotel = document.getElementById("hotelSelector").value;
		// var selectedRestaurant = document.getElementById("restaurantSelector").value;
		// var selectedThing = document.getElementById("thingSelector").value;
		res.render('index', {
	        all_hotels: hotels,
	        all_restaurants: restaurants,
	        all_things_to_do: thingsToDo,
	        selectedHotel: "selectedHotel",
	        selectedRestaurant: "selectedRestaurant",
	        selectedThing: "selectedThing"
	    });
	})
})

// router.post('/post', function(req,res,next){


// 		res.render('index', {
// 	        all_hotels: hotels,
// 	        all_restaurants: restaurants,
// 	        all_things_to_do: thingsToDo,
// 	        selectedHotel: "selectedHotel",
// 	        selectedRestaurant: "selectedRestaurant",
// 	        selectedThing: "selectedThing"
// 	    })
// })


// router.get('/bower_components', function(req,res){

// 	express.static('../bower_components')
// })


//callback method

// router.get('/', function(req, res, next) {
// 	Hotel.find({}, function(err, hotels) {
// 	    Restaurant.find({}, function(err, restaurants) {
// 	        ThingToDo.find({}, function(err, thingsToDo) {
// 	            res.render('index', {
// 	                all_hotels: hotels,
// 	                all_restaurants: restaurants,
// 	                all_things_to_do: thingsToDo
// 	            });
// 	        });
// 	    });
// 	});
// });

module.exports = router;
