/*
subscription.js
Author: Joseph Camacho-Terrazas
*/

/*Session Objects*/
var session1 = {name:"Depression", subscription:false, timeStart: 9, timeEnd: 11};
var session2 = {name:"PTSD", subscription:false, timeStart: 11, timeEnd: 13};
var session3 = {name:"Anxiety", subscription:false, timeStart: 13, timeEnd: 15};
var session4 = {name:"Substance Abuse", subscription:false, timeStart: 15, timeEnd: 17};

/*Functions*/

/* 
Checks the subscription status of each session. If the user is not subscribed, it will display a subscribe button.
If the user is subscribed, it will call checkTime to further verify join requirements.
Unsubscribing is currently under development.
*/
function checkSubStatus() {
    //depression switch
    switch (session1.subscription) {
        case false:
            document.getElementById("subInfo1").innerHTML = "Not Subscribed";
            document.getElementById("subJoin1").innerHTML = "<button id = \"joinButton\" onclick= subscribeToSession(1);>Subscribe</button>";
            //document.getElementById("unbsub1").innerHTML = "";
            break;
        case true:
            document.getElementById("subInfo1").innerHTML = "Subscribed";
            checkTime(1);
            //document.getElementById("unsub1").innerHTML = "<button id = \"unsubButton\" onclick= unsubscribeSession(1);>Unsubscribe</button>";
            break;
        }

    //ptsd switch
    switch (session2.subscription) {
        case false:
            document.getElementById("subInfo2").innerHTML = "Not Subscribed";
            document.getElementById("subJoin2").innerHTML = "<button id = \"joinButton\" onclick= subscribeToSession(2);>Subscribe</button>";
            //document.getElementById("unbsub2").innerHTML = "";
            break;
        case true:
            document.getElementById("subInfo2").innerHTML = "Subscribed";
            checkTime(2);
            //document.getElementById("unsub2").innerHTML = "<button id = \"unsubButton\" onclick= unsubscribeSession(2);>Unsubscribe</button>";
            break;
    }

    //anxiety switch
    switch (session3.subscription) {
        case false:
            document.getElementById("subInfo3").innerHTML = "Not Subscribed";
            document.getElementById("subJoin3").innerHTML = "<button id = \"joinButton\" onclick= subscribeToSession(3);>Subscribe</button>";
            //document.getElementById("unbsub3").innerHTML = "";
            break;
        case true:
            document.getElementById("subInfo3").innerHTML = "Subscribed";
            checkTime(3);
            //document.getElementById("unsub3").innerHTML = "<button id = \"unsubButton\" onclick= unsubscribeSession(3);>Unsubscribe</button>";
            break;
    }

    //substance abuse switch
    switch (session4.subscription) {
        case false:
            document.getElementById("subInfo4").innerHTML = "Not Subscribed";
            document.getElementById("subJoin4").innerHTML = "<button id = \"joinButton\" onclick= subscribeToSession(4);>Subscribe</button>";
            //document.getElementById("unbsub4").innerHTML = "";
            break;
        case true:
            document.getElementById("subInfo4").innerHTML = "Subscribed";
            checkTime(4);
            //document.getElementById("unsub4").innerHTML = "<button id = \"unsubButton\" onclick= unsubscribeSession(4);>Unsubscribe</button>";
            break;
    }

    
}

/*
This function activates when the user subscribes to a session.
It will set the subsciption variable of the appropriate session object.
Then it calls checkSubStatus to update the display.
*/
function subscribeToSession(sessionNum) {
    switch (sessionNum) {
        case 1: session1.subscription = true; break;
        case 2: session2.subscription = true; break;
        case 3: session3.subscription = true; break;
        case 4: session4.subscription = true; break;
    }

    checkSubStatus();
}

/*
This function will unsubscribe a user from a session.
It sets the subscription variable of the appropriate session object.
Then it calls checkSubStatus to update the display.
*/
function unsubscribeSession(sessionNum) {
    switch (sessionNum) {
        case 1: session1.subscription = false; break;
        case 2: session2.subscription = false; break;
        case 3: session3.subscription = false; break;
        case 4: session4.subscription = false; break;
    }

    checkSubStatus();
}

/*
This functions checks the current time of the PC, and controls whether the session is actually joinable.
It will get the hour of the current time. Then, it compares it to the start and end hour of the appropriate session.
If the session is active at the time, the user will be taken to the respective chat.
If the session is not active, it will display a message with no function.
*/
function checkTime(sessionNum) {
    var currentTime = new Date();
    currentHour = currentTime.getHours();
    currentHour = 13;    

    switch (sessionNum) {
        //depression
        case 1: 
            if (currentHour >= session1.timeStart && currentHour < session1.timeEnd) {
                document.getElementById("subJoin1").innerHTML = "<button id = \"joinButton\" onclick=\"document.location = \'depression.html\'\">Join Session 1</button>";
            }
            else {
                document.getElementById("subJoin1").innerHTML = "<button id = \"joinButton\">Session Not Active Right Now</button>";
            }
            break;
        
        //ptsd    
        case 2:
            if (currentHour >= session2.timeStart && currentHour < session2.timeEnd) {
                document.getElementById("subJoin2").innerHTML = "<button id = \"joinButton\" onclick=\"document.location = \'ptsd.html\'\">Join Session 2</button>";
            }
            else {
                document.getElementById("subJoin2").innerHTML = "<button id = \"joinButton\">Session Not Active Right Now</button>";
            } 
            break;
        
        //anxiety
        case 3:
            if (currentHour >= session3.timeStart && currentHour < session3.timeEnd) {
                document.getElementById("subJoin3").innerHTML = "<button id = \"joinButton\" onclick=\"document.location = \'anxiety.html\'\">Join Session 3</button>";
            }
            else {
                document.getElementById("subJoin3").innerHTML = "<button id = \"joinButton\">Session Not Active Right Now</button>";
            } 
            break;

        //substance abuse
        case 4:
            if (currentHour >= session4.timeStart && currentHour < session4.timeEnd) {
                document.getElementById("subJoin4").innerHTML = "<button id = \"joinButton\" onclick=\"document.location = \'substance.html\'\">Join Session 4</button>";
            }
            else {
                document.getElementById("subJoin4").innerHTML = "<button id = \"joinButton\">Session Not Active Right Now</button>";
            } 
            break;
    }

}