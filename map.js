/* Google Places API & Functionality */

var placeSearch, autocomplete, geocoder;
var placesID = "";
var placesAPI = "AIzaSyADGBWsEdFbuCg0xzSfPVrbm1mihab7ro4";
var myKeyword = "Japanese";
var myLocation;
var myfields = "photos,formatted_address,name,rating, opening_hours"
var price_level1 = [];
var price_level2 = [];
var price_level3 = [];
var price_level4 = [];

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete'))/*,
      {types: ['(cities)']}*/);

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {

        console.log(results[0].geometry.location);

      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

function fillInAddress() {
  var place = autocomplete.getPlace();
  console.log(place.place_id);
  console.log(place);
  placesID = place.place_id;
  console.log(placesID);
  //   codeAddress(document.getElementById('autocomplete').value);
  var test4URL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placesID+"&key="+placesAPI;
 

  $.ajax({
  url: test4URL,
  method: "GET"
  }).then(function(response) {
  console.log(response);
  console.log(response.result.geometry.location.lat);
  console.log(response.result.geometry.location.lng);
  myLocation = response.result.geometry.location.lat +","+response.result.geometry.location.lng;
  secondRequest(myLocation);
});

  
  function secondRequest(coordinates){
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+coordinates+"&rankby=distance&type=restaurant&keyword="+myKeyword+"&fields="+myfields+"&key="+placesAPI,
      method: "GET"
      }).then(function(response) {
      console.log(coordinates);
      console.log(response);
      console.log(response.results.length);
      console.log(response.results[0].price_level);
      console.log(response.results[0]);
      for (var i = 0; i < response.results.length; i++){
        if(response.results[i].price_level === 1){
          price_level1.push(response.results[i]);
        }
        else if(response.results[i].price_level === 2){
          price_level2.push(response.results[i]);
        }
        else if(response.results[i].price_level === 3){
          price_level3.push(response.results[i]);
        }
        else{
          price_level4.push(response.results[i]);
        }
      }
      
      console.log(price_level1);
      console.log(price_level2);
      console.log(price_level3);
      console.log(price_level4);
      console.log(price_level1[0].rating);
      findHighestRating(price_level1);
      findHighestRating(price_level2);
      findHighestRating(price_level3);
      findHighestRating(price_level4);

      
    });
  }

  function findHighestRating(array) {
    var max = 0;
    var maxObject;
    for(var i = 0; i < array.length; i++){
      if(array[i].rating > max){
        max = array[i].rating;
        maxObject = array[i];
      }
    }
    console.log(max);
    console.log(maxObject);
    return max, maxObject;
    
  }

}

/* Unsplash API & Functionality */

var unsplashAPI = "https://api.unsplash.com/photos/random/?query=food&count=10&client_id=c6818cda8c5de970833aeb6395c740b8d73b0b1c5fb0b9efb8555cac93895c94"

//set up base url for unsplash image
const UNSPLASH_URL = "https://unsplash.com/photos/";
var image_array = [];

$.ajax({
  url: unsplashAPI,
  method: "GET"
  }).then(function(response) {
  // console.log(response);
  for (let i = 0; i < response.length; i++) {
    var element = UNSPLASH_URL + response[i].id;
    image_array.push(element);
  }
});

