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

var train;
var destination;
var time;
var frequency;
// var postID = "";

// Grabbing input values on click and push to Firebase






$("#submit").on("click",function(e){
	train = $("#trainNameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#firstTrainTimeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();



	firebase.database().ref().push({
		train:train,
		destination:destination,
		time:time,
		frequency:frequency,
		dateAdded:firebase.database.ServerValue.TIMESTAMP,
		

	});
		return false;
	// postID = newPostRef.key;
	// console.log(postID);

});


$("#displayContainer").append('<td class="head">Train Name</td>');
$("#displayContainer").append('<td class="head">Destination</td>');
$("#displayContainer").append('<td class="head">Next Arrival</td>');
$("#displayContainer").append('<td class="head">Frequency (min)</td>');
$("#displayContainer").append('<td class="head">Minutes Away</td>');





firebase.database().ref().on("child_added", function(snapshot){
  		var time = snapshot.val().time;
      var convertedTime = moment(time, "HH:mm");
      convertedTime.format("HHmm");
      console.log("user entered: " + convertedTime.format("HHmm"));
      //Difference from start time until now in minutes
      var currentTime = moment().format("HH:mm");
      console.log("Current time = " + currentTime);
      var timeFromStart = moment().diff(convertedTime, "minutes");
      var minTillNext = timeFromStart % snapshot.val().frequency;
      console.log(minTillNext.toString());
      console.log("Minutes until Next Train: " + minTillNext);
      // console.log("Calc test: " + (currentTime) + minTillNext);

      //minutes time till next

      var nextArrival = moment().add(minTillNext, 'minutes').format("hh:mm");
      // var nextArrival = currentTime;
      console.log("testing time " + nextArrival);
      console.log(nextArrival);
      // console.log(nextArrival);
      // moment().add(Duration);



	

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
	$("#displayContainer").append(('<td>' + nextArrival + "</td>"));
	$("#displayContainer").append(('<td>' + snapshot.val().frequency + "</td>"));
	$("#displayContainer").append(('<td>' + minTillNext + "</td>"));
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
 
