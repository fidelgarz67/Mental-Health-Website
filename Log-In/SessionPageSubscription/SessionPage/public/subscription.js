/*
subscription.js
Author: Joseph Camacho-Terrazas
*/

/*
     changed "button" for "SubButton" in case of anything change it back!
*/

/*Session Objects*/
var session1 = {name:"Depression", subscription:"", timeStart: 9, timeEnd: 11};
var session2 = {name:"PTSD", subscription:"", timeStart: 11, timeEnd: 13};
var session3 = {name:"Anxiety", subscription:"", timeStart: 13, timeEnd: 15};
var session4 = {name:"Substance Abuse", subscription:"", timeStart: 15, timeEnd: 17};

/*Functions*/

app.use(express.static(path.join(__dirname, 'public')));


/* 
Checks the subscription status of each session. If the user is not subscribed, it will display a subscribe button.
If the user is subscribed, it will call checkTime to further verify join requirements.
Unsubscribing is currently under development.
*/
function checkSubStatus() {
    checkStorage();
    //depression switch
    switch (session1.subscription) {
        case "false":
            document.getElementById("subInfo1").innerHTML = "Not Subscribed";
            document.getElementById("subJoin1").innerHTML = "<SubButton id = \"joinButton\" onclick= subscribeToSession(1);>Subscribe</SubButton>";
            document.getElementById("unsub1").innerHTML = "";
            break;
        case "true":
            document.getElementById("subInfo1").innerHTML = "Subscribed";
            checkTime(1);
            document.getElementById("unsub1").innerHTML = "<SubButton id = \"unsubButton\" onclick= unsubscribeSession(1);>Unsubscribe</SubButton>";
            break;
        }

    //ptsd switch
    switch (session2.subscription) {
        case "false":
            document.getElementById("subInfo2").innerHTML = "Not Subscribed";
            document.getElementById("subJoin2").innerHTML = "<SubButton id = \"joinButton\" onclick= subscribeToSession(2);>Subscribe</SubButton>";
            document.getElementById("unsub2").innerHTML = "";
            break;
        case "true":
            document.getElementById("subInfo2").innerHTML = "Subscribed";
            checkTime(2);
            document.getElementById("unsub2").innerHTML = "<SubButton id = \"unsubButton\" onclick= unsubscribeSession(2);>Unsubscribe</SubButton>";
            break;
    }

    //anxiety switch
    switch (session3.subscription) {
        case "false":
            document.getElementById("subInfo3").innerHTML = "Not Subscribed";
            document.getElementById("subJoin3").innerHTML = "<SubButton id = \"joinButton\" onclick= subscribeToSession(3);>Subscribe</SubButton>";
            document.getElementById("unsub3").innerHTML = "";
            break;
        case "true":
            document.getElementById("subInfo3").innerHTML = "Subscribed";
            checkTime(3);
            document.getElementById("unsub3").innerHTML = "<SubButton id = \"unsubButton\" onclick= unsubscribeSession(3);>Unsubscribe</SubButton>";
            break;
    }

    //substance abuse switch
    switch (session4.subscription) {
        case "false":
            document.getElementById("subInfo4").innerHTML = "Not Subscribed";
            document.getElementById("subJoin4").innerHTML = "<SubButton id = \"joinButton\" onclick= subscribeToSession(4);>Subscribe</SubButton>";
            document.getElementById("unsub4").innerHTML = "";
            break;
        case "true":
            document.getElementById("subInfo4").innerHTML = "Subscribed";
            checkTime(4);
            document.getElementById("unsub4").innerHTML = "<SubButton id = \"unsubButton\" onclick= unsubscribeSession(4);>Unsubscribe</SubButton>";
            break;
    }

    
}

/* 
This function checks local storage to see if the user is subscribed to a session.
This is only for use with a localhost session, and is not intended for proper web deployment.
The function checks to see if a storage item exists for that subscription, if not, it creates one and defaults to unsubscribed.
*/
function checkStorage() {
    if (localStorage.getItem('sub1')) {
        session1.subscription = localStorage.getItem('sub1');
    }
    else {
        localStorage.setItem("sub1","false");
        session1.subscription = localStorage.getItem('sub1');
    }

    if (localStorage.getItem('sub2')) {
        session2.subscription = localStorage.getItem('sub2');
    }
    else {
        localStorage.setItem("sub2","false");
        session2.subscription = localStorage.getItem('sub2');
    }

    if (localStorage.getItem('sub3')) {
        session3.subscription = localStorage.getItem('sub3');
    }
    else {
        localStorage.setItem("sub3","false");
        session3.subscription = localStorage.getItem('sub3');
    }

    if (localStorage.getItem('sub4')) {
        session4.subscription = localStorage.getItem('sub4');
    }
    else {
        localStorage.setItem("sub4","false");
        session4.subscription = localStorage.getItem('sub4');
    }
}

/*
This function activates when the user subscribes to a session.
It will set the local storage item of the appropriate session object.
Then it calls checkSubStatus to update the display.
*/
function subscribeToSession(sessionNum) {
    switch (sessionNum) {
        case 1: localStorage.sub1 = "true"; break;
        case 2: localStorage.sub2 = "true"; break;
        case 3: localStorage.sub3 = "true"; break;
        case 4: localStorage.sub4 = "true"; break;
    }

    checkSubStatus();
}

/*
This function will unsubscribe a user from a session.
It sets the local storage item of the appropriate session object.
Then it calls checkSubStatus to update the display.
*/
function unsubscribeSession(sessionNum) {
    switch (sessionNum) {
        case 1: localStorage.sub1 = "false"; break;
        case 2: localStorage.sub2 = "false"; break;
        case 3: localStorage.sub3 = "false"; break;
        case 4: localStorage.sub4 = "false"; break;
    }

    checkSubStatus();
}

/*
This function checks the current time of the PC, and controls whether the session is actually joinable.
It will get the hour of the current time. Then, it compares it to the start and end hour of the appropriate session.
If the session is active at the time, the user will be taken to the respective chat.
If the session is not active, it will display a message with no function.
*/
function checkTime(sessionNum) {
    var currentTime = new Date();
    currentHour = currentTime.getHours();
    //force time for testing purposes only
    //currentHour = 16;    

    switch (sessionNum) {
        //depression
        case 1: 
            if (currentHour >= session1.timeStart && currentHour < session1.timeEnd) {
                document.getElementById("subJoin1").innerHTML = "<SubButton id = \"joinButton\" onclick=\"document.location = \'depression.html\'\">Join Session 1</SubButton>";
            }
            else {
                document.getElementById("subJoin1").innerHTML = "<SubButton id = \"joinButton\">Session Not Active Right Now</SubButton>";
            }
            break;
        
        //ptsd    
        case 2:
            if (currentHour >= session2.timeStart && currentHour < session2.timeEnd) {
                document.getElementById("subJoin2").innerHTML = "<SubButton id = \"joinButton\" onclick=\"document.location = \'ptsd.html\'\">Join Session 2</SubButton>";
            }
            else {
                document.getElementById("subJoin2").innerHTML = "<SubButtontton id = \"joinButton\">Session Not Active Right Now</SubButton>";
            } 
            break;
        
        //anxiety
        case 3:
            if (currentHour >= session3.timeStart && currentHour < session3.timeEnd) {
                document.getElementById("subJoin3").innerHTML = "<SubButton id = \"joinButton\" onclick=\"document.location = \'anxiety.html\'\">Join Session 3</SubButton>";
            }
            else {
                document.getElementById("subJoin3").innerHTML = "<SubButton id = \"joinButton\">Session Not Active Right Now</SubButton>";
            } 
            break;

        //substance abuse
        case 4:
            if (currentHour >= session4.timeStart && currentHour < session4.timeEnd) {
                document.getElementById("subJoin4").innerHTML = "<SubButton id = \"joinButton\" onclick=\"document.location = \'substance.html\'\">Join Session 4</SubButton>";
            }
            else {
                document.getElementById("subJoin4").innerHTML = "<SubButton id = \"joinButton\">Session Not Active Right Now</SubButton>";
            } 
            break;
    }
}

/*
This function checks for time within the individual session page.
If the session is not active, it will redirect to the selection page.
Uses window.location.replace so that the back button won't take you back to that page.
This is to prevent a case where you type the address of an inactive session directly in the address bar.
*/

function timeErase(sessionNum) {
    var currentTime = new Date();
    currentHour = currentTime.getHours();
    //force time for testing purposes only
    //currentHour = 16;    

    switch (sessionNum) {
        //depression
        case 1: 
            if (currentHour < session1.timeStart || currentHour >= session1.timeEnd) {
                document.write("Session is Not Active!");
                window.location.replace("selection.html");
            } break;
        
        //ptsd    
        case 2: 
            if (currentHour < session2.timeStart || currentHour >= session2.timeEnd) {
                document.write("Session is Not Active!");
                window.location.replace("selection.html");
            } break;
        
        //anxiety
        case 3: 
            if (currentHour < session3.timeStart || currentHour >= session3.timeEnd) {
                document.write("Session is Not Active!");
                window.location.replace("selection.html");
            } break;

        //substance abuse
        case 4: 
            if (currentHour < session4.timeStart || currentHour >= session4.timeEnd) {
                document.write("Session is Not Active!");
                window.location.replace("selection.html");
            } break;
    }
}

/*
This functions checks to see if the user is subscribed to the session passed in.
This is to handle a case where the session is active at the time, but the user
tries to access the session without being subscribed.
Uses window.location.replace so that the back button won't take you back to that page.
*/
function sessionSubCheck(sessionNum) {
    switch (sessionNum) {
        //depression
        case 1:
            if (localStorage.getItem('sub1').localeCompare("false") == 0) {
                document.write("You Are Not Subscribed to This Session!");
                window.location.replace("selection.html");
            } break;

        //ptsd
        case 2:
            if (localStorage.getItem('sub2' == "false")) {
                document.write("You Are Not Subscribed to This Session!");
                window.location.replace("selection.html");
            } break;

        //anxiety
        case 3:
            if (localStorage.getItem('sub3' == "false")) {
                document.write("You Are Not Subscribed to This Session!");
                window.location.replace("selection.html");
            } break;

        //substance abuse
        case 4:
            if (localStorage.getItem('sub4' == "false")) {
                document.write("You Are Not Subscribed to This Session!");
                window.location.replace("selection.html");
            } break;
    }
}

/*
This function is called upon loading the session pages.
It's used to call the two check functions that will kick the user out of a session
page they're not subscribed to or is not active.
*/
function sessionChecker(num) {
    timeErase(num);
    sessionSubCheck(num);
}