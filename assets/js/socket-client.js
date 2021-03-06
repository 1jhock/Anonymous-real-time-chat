$(document).ready(function(){

	var socket = io.connect("http://localhost:3000/");
	var msg = $('#msg');
	var msgForm = $('#msg-form');
	var thread = $('#thread');
	var userLocation = '';
	var username = $('#usern').val();

	// Get location
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(pos) {

	 var latlon =  pos.coords.latitude + ',' + pos.coords.longitude;
	 
	  	 	  $.ajax({
				 type: "GET",
				 url:  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latlon+'&sensor=true', 
				 success: function(data) {
				 	// submit userdata to server.js
				 	userLocation = data.results[0].address_components[4].long_name;
				 }
			});
	};

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	};

	// load user and its location
	navigator.geolocation.getCurrentPosition(success, error, options);
	

	//emit the userdata
	//SET 2 sec gap to load the current location
	setTimeout(function(){
		socket.emit('get userdata', {user: username, location: userLocation});
	}, 2000);
	
	// scroll down
	setTimeout(function(){thread.scrollTop(thread[0].scrollHeight)}, 100);

	// emit function
	function reloadMsg(creds, callback) {
			socket.emit('send', creds);
			callback();
	}

	msgForm.on('submit', function(e){
			var creds = $(this).serialize();

		reloadMsg(creds, function(){
			setTimeout(function(){thread.scrollTop(thread[0].scrollHeight)}, 1000);
		});

		msg.val('').focus();
		e.preventDefault();
	});

	// get online users
	socket.on('online users', function(data){
		var txtString = "";
		data.forEach(function(element, index){
			txtString += '<li class="list-group-item">'+element+'</li>';
		});	

		$('#users').html(txtString);
	});

	// load messages
	socket.on('load messages', function(data){
		var threadTxt = '';
		data.forEach( function(element, index) {
			threadTxt += '<span class="msg-item">'+element.username + ': ' + element.message+'</span></br></br>';
		});

		thread.html(threadTxt);
	});


	var a = "a";
	var b = "b";
	var c = "c";
	var letters = [];

	function add_letter(letter) {
		if(letter) {
			if(letters.indexOf(letter) === -1) {
				letters.push(letter);
				console.log("The new list: " + letters );
			} else if(letters.indexOf(letter) > -1) {
				console.log("Already Exist: " + letters);
			} 
		} else {
			console.log("Please add any parameter");
		}
	}

	function rm_letter(letter) {	
		letters.splice(letters.indexOf(letter), 1);
		console.log("The new list: " + letters);
	}

	add_letter(a);
	add_letter(b);
	rm_letter(a);
	add_letter();
	add_letter(c);
	add_letter(c);


});