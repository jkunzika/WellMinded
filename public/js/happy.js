function log(txt){
	console.log(txt);
}

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function appendDiv(content, container){
	var div = document.createElement("div");
	div.textContent = content;
	container.appendChild(div);
}

function patientInit(pubnub){
	 pubnub.subscribe({
         channel : "support",
         message : function(m){ log(m) },
         connect : publish
     });
 
     function publish() {
         pubnub.publish({
             channel : "patient",
             message : "Hello support group!"
         });
     }

    pubnub.unsubscribe({
    	channel : 'patient',
 	});

 	// showPatientOptions();

}

function supportInit(pubnub){
	var container = document.getElementById('updateContainer');
	 pubnub.subscribe({
         channel : "patient",
         message : function(m){ var date = new Date(); var msg = m + " (sent at " + date + ")" ; updatePatientStatus(m); appendDiv(msg, container); },
         connect : publish
     });
 
     function publish() {
         pubnub.publish({
             channel : "support",
             message : "Hello patient."
         });
     }

    pubnub.unsubscribe({
    	channel : 'support',
 	});

	// hidePatientOptions();

}

function updateSupportGroup(pubnub, msg){
     pubnub.publish({
         channel : "patient",
         message : msg
     });

}

function updatePatient(pubnub, msg){
     pubnub.publish({
         channel : "support",
         message : msg
     });

}

function changeMood(index){
    $('#mood')[0].src = 'images/mood' + index + '.png';
}

function updateSupportWithMood(pubnub, mood){
    switch(mood){
        case 1:
            updateSupportGroup(pubnub, "I'm very sad!");
            break;
        case 2:
            updateSupportGroup(pubnub, "I'm sad!");
            break;
        case 3:
            updateSupportGroup(pubnub, "I'm not happy.");
            break;
        case 4:
            updateSupportGroup(pubnub, "I'm okay.");
            break;
        case 5:
            updateSupportGroup(pubnub, "I'm happy!");
            break;
        case 6:
            updateSupportGroup(pubnub, "I'm doing awesome!!"); 
            break;
        default:
            log("update was not valid. please try again");
    }
}

function updatePatientStatus(status){
    $('#currentPatientStatus').html(status);
    $('#myModal').modal('show');
}

function showPatientOptions() {
	$('#updateContainer').css('visibility','hidden');
  	$('#cool').css('visibility','visible');
  	$('#help').css('visibility','visible');
}

function hidePatientOptions() {
	$('#updateContainer').css('visibility','visible');
  	$('#cool').css('visibility','hidden');
  	$('#help').css('visibility','hidden');

}
