var text;
var users = {};
var scores = {};
$(document).ready(function(){
    $.ajaxSetup({
        async: false
    });
    $.getJSON("quiz.JSON", function(callback) {
        text = callback; 
    });
    
    $("#title").text(text.Qs[0].prompt);
    /*if (userName === "") {
        if (location.href == 'index.html'){
            alert("You must log in first!");
            location.href = 'login.html';
        }
    } */
    $("#words").hide();
    if (localStorage.getItem("users") != null && localStorage.getItem("users")!=undefined){
        users=$.parseJSON(localStorage.getItem("users"));//get users
    }
    if (localStorage.getItem("scores") != null && localStorage.getItem("scores")!=undefined){
        scores=$.parseJSON(localStorage.getItem("scores"));//get scores
    }   
 
   
});

var userName = "";
var password;
var numQ = 1;
var rights = 0;
var wrongs = 0;
var nameOf;
var array = [];



//****************    
//Hides the countinue button and sets off the recursive cycles of nextQuestion()    
function enterName() {
    if (userName === "") {
        alert("YOU ARE NOT LOGGED IN! Please log in!");
        changeToLogin();
    }
    else {
        
        alert("you are logged in as " + userName);
        $("#forName").remove();
        nameOf = $("#test").val();
        for (var i = 0; i < text.Qs[numQ].answers.length; i++){
           array.push(-1);     
        }
        nextQuestion();
    }
}
    
//*****************    
//Responsible for displaying, checking, and animating each individual question    
function nextQuestion(){
    $("#qslot").text("Hi "+ userName + "! " + text.Qs[numQ].prompt);
    $("h1").text("Question " + numQ.toString());   
    $(".quiz").remove();
    showQuestions();
    if (numQ == 1){
        countinueButton();
    }
    //$(":checked").hide(1000);
    //nextQuestion();
    //<input type="radio" id = quiz name = "q" class = 1><p2 class = 1> HI</p2><br>
}

//****************
//Creates the countinue button
function countinueButton(){
    var cont = $('<button id=countinue onclick = checkQuestions()>Continue</button>');
    cont.appendTo($("footer"));
}

//****************
//Creates the back button
function backButton(){
    var cont = $('<button id=bck onclick = back()>Back</button>');
    cont.appendTo($("footer"));
    
}

//****************
//Move to the last question
function back(){
        if (numQ == 2){
            $("#bck").remove();
        }
        numQ = numQ - 1;
        $("#qslot").text("Hi "+ nameOf + "! " + text.Qs[numQ].prompt);
        $("h1").text("Question " + numQ.toString());   
        $(".quiz").fadeOut();
        $(".quiz").remove();
        showQuestions();
}

//*****************
//Checks to see which question is marked correct, if none it stops the user from countinuing
function checkQuestions(){
    var i;
    for (i = 0; i < text.Qs[numQ].answers.length; i++){
        if($("#answer"+i).is(':checked')) {
            if (numQ == 1) {
                backButton();
            }
            array[numQ] = i;
            if(text.Qs[numQ].answers[i].correct == 1) {
                rights = rights + 1;
                $(".quiz").fadeOut();
                numQ = numQ+1;
                if (numQ + 1 > text.Qs.length){
                    finish();
                }
                else {
                    nextQuestion()
                }
            }
            else {
                wrongs = wrongs + 1;
                $(".quiz").fadeOut();
                numQ = numQ+1;
                if (numQ + 1 > text.Qs.length){
                    finish();
                }
                else {
                    nextQuestion()
                }
            }
        }
    }
}

//******************
//Adds in all the answer choices from the current question
function showQuestions(){
    var i;
    $("form").hide();
    $( "img" ).remove();
    for (i = 0; i < text.Qs[numQ].answers.length; i++){
        if (i == array[numQ]) {
            var newQ = $('<br class = quiz><br class = quiz><input type="radio" name = "q" class = quiz id = answer'+i+' checked><p2 class = quiz> ' +         text.Qs[numQ].answers[i].choice + '</p2><br class = quiz>');
            $("form").append(newQ);
            
        }
        else {
            var newQ = $('<br class = quiz><br class = quiz><input type="radio" name = "q" class = quiz id = answer'+i+' ><p2 class = quiz> ' +         text.Qs[numQ].answers[i].choice + '</p2><br class = quiz>');
            $("form").append(newQ);
        }
    }         
    $("form").show(1000);
    picSelect("form",text.Qs[numQ].tag);
}

//******************
//Display results, and get rid of everything else
function finish(){
    $("p1").text("Wow " + nameOf + " you got " + rights + " right, and " + wrongs + " wrong!");
    $("#bck").remove();
    $("h1").text("QUIZ OVERRRR");
    $("#countinue").remove();
    var c = $('<canvas id="canvas" width="400" height="300">');
    c.appendTo($("footer"));
    var myColor = ["#ECD078","#D95B43","#C02942","#542437","#53777A"];
    var data = [wrongs, rights];
    var tot = wrongs + rights;
    var canvas;
    var can;
    var last = 0;
    canvas = document.getElementById("canvas");
    can = canvas.getContext("2d");
    can.clearRect(0, 0, canvas.width, canvas.height);
    //
    //This function delays the indented code by the number at the bottom in milliseconds
    setTimeout(function(){
        for (var i = 0; i < data.length; i++) {
        can.fillStyle = myColor[i];
        can.beginPath();
        can.moveTo(200,150);
        can.arc(200,150,150,last,last + (Math.PI*2*(data[i]/tot)),false);
        can.lineTo(200,150);
        can.fill();
        last += Math.PI*2*(data[i]/tot);
        }
    },500); 
    calcScores();
    var yo = $('<p1 id="scor"><p1>');
    $("p1").append(yo);
    $("#scor").text("#1 " + scores[0][1] + " " + scores[0][0]);
   
}

//******************
//Called when users try to log in
function logIn(){
    userName = $("#userName").val();
    password = $("#password").val();
    if ($("#userName").val() != ""){
        if ($("#password").val() === ""){
            alert("NO PASSWORD ENTERED");
        }
        else {
            $('#frm')[0].reset();
            if (userName in users) {
                if (users[userName] === password){
                    changeToQuiz();
                }
                else {
                    alert("USERNAME AND PASSWORD DO NOT MATCH");
                }
            }   
            else {
                signUp();
            }   
        }
    }
    else {
        alert("MUST ENTER A USERNAME");
    }
}

//******************
//Called when users try signup
function signUp(){
    $("#title").text("Sign Up!");
    $("#words").text("That username does not exist, would you like to create a new account with the password "+ password + " ?");
    $("#words").show(1000);
    $("#frm1").fadeOut();
    $("#loggin").remove();
    var c = $('<button id="signnup" onclick = signupConfirmed()>Sign Up</button>');
    c.appendTo($("footer"));
    users[userName]=password;
    localStorage.setItem("users", JSON.stringify(users));
       
}

function signupConfirmed(){
    changeToQuiz();
    $("#signnup").remove();
}

          
function changeToLogin(){
    $("#title").text("Log in");
    $("#qslot").remove();
    var c = $('<p1 id = "words"></p1><form id = "frm1"> Username: <input type="text" id ="userName" value =""> <br id = "cush1"> <br id = "cush2"> Password: <input type="password" id = "password" value=""></form>');
    c.appendTo($("footer"));
    $("#forName").remove();
    var e = $('<button id="loggin" onclick = logIn()>Log In</button>');
    e.appendTo($("footer"));
}

function changeToQuiz(){
    $("#title").text("Welcome to my quiz!");
    var c = $('<p1 id="qslot">Hi! What is your name? <input type="text" id="test" value="Name"></p1>');
    $("#afterThis").after(c);
    $('<button id="forName" onclick = enterName()>Continue</button>').appendTo($("footer"));
    $("#words").remove();
    $("#frm1").remove();
    //$('<button id="forName" onclick = enterName()>Continue</button>').appendTo($("footer"));
    $("#loggin").remove();
    
}

function picSelect(element, ref){
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON( flickerAPI, {
        tags: ref,
        tagmode: "any",
        format: "json"
    })
    .done(function( data ) {
        $.each( data.items, function( go, k ) {
            $( "<img>" ).attr( "src", k.media.m ).appendTo(element);
            if ( go === 0 ) {
            return false;
            }
        });
    });
}
        
function calcScores(){
    if (scores!=null && scores!= undefined && scores.length>0){
        scores[userName]=rights*10-wrongs*5;
    }
    else {
        scores[userName]=rights*10-wrongs*5;
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}