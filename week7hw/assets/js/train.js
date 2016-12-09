 // Firebase Stuff

 var config = {
    apiKey: "AIzaSyBQj-8zO09IqEBp32XZLPSHqYg_W867wGw",
    authDomain: "trainschedule-2b9d2.firebaseapp.com",
    databaseURL: "https://trainschedule-2b9d2.firebaseio.com",
    storageBucket: "trainschedule-2b9d2.appspot.com",
    messagingSenderId: "32464150943"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Variables for Firebase

var train = "";
var destination = "";
var time = "";
var frequency = "";
var minutesAway = "";

// Grabbing input values on click and push to Firebase

$("#submit").on("click",function(){
	train = $("#trainNameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#firstTrainTimeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	firebase.database().ref().push({
		train:train,
		destination:destination,
		time:time,
		frequency:frequency,
		dateAdded:firebase.database.ServerValue.TIMESTAMP

	})

})

$("#displayContainer").append('<td class="head">Train Name</td>');
$("#displayContainer").append('<td class="head">Destination</td>');
$("#displayContainer").append('<td class="head">Next Arrival</td>');
$("#displayContainer").append('<td class="head">Frequency (min)</td>');
$("#displayContainer").append('<td class="head">Minutes Away</td>');


firebase.database().ref().on("child_added", function(snapshot){
	
var a = moment.duration("00:00:" + snapshot.val().frequency);
console.log(a); 

var b =moment(snapshot.val().time,"H:mm a").add(snapshot.val().frequency, 'minutes');
console.log(b)
var nextArrival = b.format("h:mm a");


var c = moment().subtract(nextArrival, "HH:mm");
console.log(c);

var minutesAway = b.diff(moment(), "minutes")


	$("#displayContainer").append('<tr>');
	$("#displayContainer").append(('<td>' + snapshot.val().train + "</td>"));
	$("#displayContainer").append(('<td>' + snapshot.val().destination + "</td>"));
	$("#displayContainer").append(('<td>' + nextArrival + "</td>"));
	$("#displayContainer").append(('<td>' + snapshot.val().frequency + "</td>"));
	$("#displayContainer").append(('<td>' + minutesAway + "</td>"));
	$("#displayContainer").append("</tr");


});

// Curent Time Display
var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#displayCurrentTime')
    update();
    setInterval(update, 1000);
});


// 
 
