$(document).ready(function() {

  // Place JavaScript code here...
  // hidePatientOptions();
  // $('#updateContainer').css('visibility','hidden');


  var secondsSinceUpdate = 0;
  var myVar;
  
  function startTimer(){
    myVar=setInterval(function () {myTimer()}, 1000);

    function myTimer() {
        var d = new Date();
        secondsSinceUpdate++;
        if(secondsSinceUpdate == 10){
          if(confirm("You haven't updated in a while? Are you okay?")){
            clearTimer();
          }
        }
    }
  }

  function clearTimer(){
    clearInterval(myVar);
    secondsSinceUpdate = 0;
    startTimer();
  }
  var recognition;
  function initSpeech(){
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = function(event) { 
      console.log(event) 
    } 
    recognition.start();

  }

  var patientSpeechArray;
  var currentPatientComment;

  var pubnub;
  var currentMoodIndex = 6;

  loadScript("http://cdn.pubnub.com/pubnub.min.js", function(){
  	log("pubnub is loaded!");
  	pubnub = PUBNUB.init({
         publish_key   : 'pub-c-b5f983d9-fc91-4688-947f-84ad5de4ced3',
         subscribe_key : 'sub-c-8df54024-361a-11e4-afa1-02ee2ddab7fe'
    });
    log(location);
    if(location.pathname == "/patient"){
    	patientInit(pubnub);
      initSpeech();
      startTimer();
    } else if(location.pathname == "/support"){
    	supportInit(pubnub);
    }
  });

  log("it works!");

  $('#slider').slider({
  		formatter: function(value) {
        // log(value);
			return 'Current value: ' + value.value;
		}
  })  .on('slide', function(ev){
              currentMoodIndex = ev.value + 1;
              changeMood(currentMoodIndex);
              log(ev.value);
    			return 'Current value: ' + ev.value


  });;

  // $('#patient').click(function(){
  // 	// $(this).css('background-color', '#121212');
  // 	// $(this).css('color', '#fff');
  // 	// $('#support').css('background-color','#f5f5f5');
  // 	// $('#support').css('color','#121212');

  // 	patientInit(pubnub);
  // });

  // $('#support').click(function(){
  // 	// $(this).css('background-color', '#121212');
  // 	// $(this).css('color', '#fff');
  // 	// $('#patient').css('background-color','#f5f5f5');
  // 	// $('#patient').css('color','#121212');

  // 	supportInit(pubnub);


  // });
  $('#update').click(function(){
    updateSupportWithMood(pubnub, currentMoodIndex);
    clearTimer();
  });

  $('#cool').click(function(){
  	updateSupportGroup(pubnub, "I'm cool!");
  });

  $('#help').click(function(){
  	updateSupportGroup(pubnub, "I need help!");
  });


});
