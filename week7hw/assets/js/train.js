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
// var postID = "";

// Grabbing input values on click and push to Firebase






$("#submit").on("click",function(e){
	e.preventDefault();
	train = $("#trainNameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#firstTrainTimeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();



	var newPostRef = firebase.database().ref().push({
		train:train,
		destination:destination,
		time:time,
		frequency:frequency,
		dateAdded:firebase.database.ServerValue.TIMESTAMP,
		

	});
	// postID = newPostRef.key;
	// console.log(postID);

});


$("#displayContainer").append('<td class="head">Train Name</td>');
$("#displayContainer").append('<td class="head">Destination</td>');
$("#displayContainer").append('<td class="head">Next Arrival</td>');
$("#displayContainer").append('<td class="head">Frequency (min)</td>');
$("#displayContainer").append('<td class="head">Minutes Away</td>');




firebase.database().ref().on("child_added", function(snapshot){


	frequency;
	time;
	var firstTimeConverted = moment(time, "hh:mm");
	var currentTime = moment(moment());
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);	
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
	nextTrain = (moment(nextTrain).format("hh:mm a"));


	

// console.log(snapshot.key);



// var a = moment.duration("00:00:" + snapshot.val().frequency);
// // console.log(a); 

// var b =moment(snapshot.val().time,"H:mm a").add(snapshot.val().frequency, 'minutes');
// // console.log(b);
// var nextArrival = b.format("h:mm a");


// var c = moment().subtract(nextArrival, "HH:mm");
// console.log(c);

// var minutesAway = b.diff(moment(), "minutes")


	$("#displayContainer").append('<tr>');
	$("#displayContainer").append(('<td>' + snapshot.val().train + "</td>"));
	$("#displayContainer").append(('<td>' + snapshot.val().destination + "</td>"));
	$("#displayContainer").append(('<td>' + nextTrain + "</td>"));
	$("#displayContainer").append(('<td>' + snapshot.val().frequency + "</td>"));
	$("#displayContainer").append(('<td>' + tMinutesTillTrain + "</td>"));
	// $("#displayContainer").append('<td>' + '<button type="button">' + "Remove" + '</button>' + "</td>");

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

// $("#displayContainer").on("click", "button", function(){
// 	postID;
// 	alert(this.postID);
// });
 
