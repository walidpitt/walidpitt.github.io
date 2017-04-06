
 
  var config = {
    apiKey: "AIzaSyBpQ9m7HEY3uYzHbkcfC8dJ0fYVoExuW5Y",
    authDomain: "fir-intro-40e47.firebaseapp.com",
    databaseURL: "https://fir-intro-40e47.firebaseio.com",
    projectId: "fir-intro-40e47",
    storageBucket: "fir-intro-40e47.appspot.com",
    messagingSenderId: "105158958937"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var firebaseDataObject = null;

  var updateKey;

  var n = 0;

  $("#add-train-btn").on("click", function(){

  event.preventDefault();

  
  var trainName = $("#train-input").val().trim();
  var trainDest = $("#role-input").val().trim();
  var trainFrequency = $("#train-frequency").val().trim();
  var nextArrival = $("#train-start").val().trim();

  
  var newTrain = {
    name:  trainName,
    destination: trainDest,
    frequency: trainFrequency,
    arrival: nextArrival
  }

  
  database.ref().push(newTrain);

  
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);

  alert("new train")

  
  $("#train-input").val("");
  $("#role-input").val("");
  $("#train-start").val("");
  $("#train-frequency").val("");

  
  return false;
});



database.ref().on("child_added", function(childSnapshot){

  
  var tFrequency = $("#train-frequency").val().trim();
  var firstTime = $("#train-start").val(); 

  
  var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
  

  
  var currentTime = moment();
  

  
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  

  
  var tRemainder = diffTime % tFrequency;
  

  
  var tMinutesTillTrain = tFrequency - tRemainder;
  

  
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  

  console.log(childSnapshot.val());

  
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().arrival;

  
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFrequency);
  console.log(nextArrival);

  
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td></tr>");

});


