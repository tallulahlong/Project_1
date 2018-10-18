var config = {
    apiKey: "AIzaSyAAPWxAOYam0qovECq_ULRVWxNkHfRwakA",
    authDomain: "project-1-480d6.firebaseapp.com",
    databaseURL: "https://project-1-480d6.firebaseio.com",
    projectId: "project-1-480d6",
    storageBucket: "project-1-480d6.appspot.com",
    messagingSenderId: "233041457859"
  };
  
  firebase.initializeApp(config);

      // Create a variable to reference the database.
      var database = firebase.database();

      // Initial Values
      var restaurant = "";
      var name = "";
      var email = "";
      var recommendation = "";
  
      // Capture Button Click
      $("#add-user").on("click", function(event) {
        event.preventDefault();
  
        // Grabbed values from text-boxes
        restaurant = $("#restaurant-input").val().trim();
        name = $("#name-input").val().trim();
        email = $("#email-input").val().trim();
        recommendation = $("#recommendation-input").val().trim();
  
        // Code for "Setting values in the database"
        database.ref().set({
          restaurant: restaurant,
          name: name,
          email: email,
          recommendation: recommendation
        });
  
      });
  
      // Firebase watcher + initial loader HINT: .on("value")
      database.ref().on("value", function(snapshot) {
  
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().restaurant);
        console.log(snapshot.val().name);
        console.log(snapshot.val().email);
        console.log(snapshot.val().recommendation);
  
        // Change the HTML to reflect
        $("#restaurant-display").text(snapshot.val().restaurant);
        $("#name-display").text(snapshot.val().name);
        $("#email-display").text(snapshot.val().email);
        $("#recommendation-display").text(snapshot.val().recommendation);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });