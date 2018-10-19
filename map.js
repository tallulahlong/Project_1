

var placeSearch, autocomplete, geocoder;
var placesID = "";
var placesAPI = "AIzaSyADGBWsEdFbuCg0xzSfPVrbm1mihab7ro4";
// var myKeyword = document.getElementById("category-input");

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
  $("#search-restaurant").on("click", function(event) {
  event.preventDefault();
  
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
});

  
  function secondRequest(coordinates){
    var myKeyword = $("#category-input").val().trim();
    $("#category-input").empty()

    $.ajax({
      url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+coordinates+"&rankby=distance&type=restaurant&keyword="+myKeyword+"&fields="+myfields+"&key="+placesAPI,
      method: "GET"
      }).then(function(response) {
      console.log(myKeyword);
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
        else if(response.results[i].price_level === 4){
          price_level4.push(response.results[i]);
        }
        else{
          
        }
      }
      
      console.log(price_level1);
      console.log(price_level2);
      console.log(price_level3);
      console.log(price_level4);
      if (price_level1.length > 0){
        // $(".food-result1").empty();
        findHighestRating(price_level1);
      }
      else {

      }
      if (price_level2.length > 0){
        // $(".food-result2").empty();
        findHighestRating(price_level2);
      }
      else {

      }
      if (price_level3.length > 0){
        // $(".food-result3").empty();
        findHighestRating(price_level3);
      }
      else {

      }
      if (price_level4.length > 0){
        // $(".food-result4").empty();
        findHighestRating(price_level4);
      }
      else {

      }

      
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
    if (maxObject.price_level === 1){

      $("#dollar1name").append(maxObject.name);
      $("#dollar1rating").append(max);
      $("#dollar-one").append(maxObject.vicinity);
    }
    else if (maxObject.price_level ===2){
      $("#dollar2name").append(maxObject.name);
      $("#dollar2rating").append(max);
      $("#dollar-two").append(maxObject.vicinity);
    }
    else if (maxObject.price_level ===3){
      $("#dollar3name").append(maxObject.name);
      $("#dollar3rating").append(max);
      $("#dollar-three").append(maxObject.vicinity);
    }
    else if (maxObject.price_level ===4) {
      $("#dollar4name").append(maxObject.name);
      $("#dollar4rating").append(max);
      $("#dollar-four").append(maxObject.vicinity);
    }
    else{

    }
    return max, maxObject;
    
  }

}

// function searchagain() {
      //   price_level1.empty();
      //   price_level2.empty();
      //   price_level3.empty();
      //   price_level4.empty();
      //   $("#dollar1name").empty();
      //   $("#dollar1rating").empty();
      //   $("#dollar-one").empty();
  
      //   $("#dollar2name").empty();
      //   $("#dollar2rating").empty();
      //   $("#dollar-two").empty();
    
      //   $("#dollar3name").empty();
      //   $("#dollar3rating").empty();
      //   $("#dollar-three").empty();
  
      //   $("#dollar4name").empty();
      //   $("#dollar4rating").empty();
      //   $("#dollar-four").empty();
  
      //   }






 




