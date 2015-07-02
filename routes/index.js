var Promise = require('bluebird')
var models = require('../models/index')
var express = require('express');
var router = express.Router();

var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var ThingToDo = models.ThingToDo;
var Place = models.Place;


/* GET home page. */

router.get('/', function(req,res,next){
	Promise.all([Hotel.find({}).exec(),Restaurant.find({}).exec(),ThingToDo.find({}).exec(),Place.find({}).exec()])
	.spread(function(hotels,restaurants,thingsToDo,places){
		console.log(hotels)
		res.render('index', {
	        hotels: hotels,
	        restaurants: restaurants,
	        things_to_do: thingsToDo,
	        place: places
	    });
	})
})




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
