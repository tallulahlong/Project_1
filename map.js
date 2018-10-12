var placeSearch, autocomplete, geocoder;
var placesID = "";
var placesAPI = "AIzaSyADGBWsEdFbuCg0xzSfPVrbm1mihab7ro4";
var myKeyword = "Japanese";
var myLocation;
var myfields = "photos,formatted_address,name,rating, opening_hours"

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

        alert(results[0].geometry.location);

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
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
      url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+coordinates+"&radius=1500&type=restaurant&keyword="+myKeyword+"&fields="+myfields+"&key="+placesAPI,
      method: "GET"
      }).then(function(response) {
      console.log(coordinates);
      console.log(response);
    });
  }


}

 




