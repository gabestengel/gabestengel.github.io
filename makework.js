var text;
$(document).ready(function(){
    $.ajaxSetup({
        async: false
    });
    $.getJSON("quiz.JSON", function(callback) {
        text = callback 
    });
    if (userName === "") {
        alert("You must log in first!");
        location.href = 'login.html';
    }
    $("#words").hide();
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
    $("#forName").remove();
    nameOf = $("#test").val();
    for (var i = 0; i < text.Qs[numQ].answers.length; i++){
       array.push(-1);     
    }
    nextQuestion();
}
    
//*****************    
//Responsible for displaying, checking, and animating each individual question    
function nextQuestion(){
    $("#qslot").text("Hi "+ nameOf + "! " + text.Qs[numQ].prompt);
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
    var yo = $('<button id=res onclick = seeWhich()>See answers!</button>');
    $("p1").append(yo);
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
            if (localStorage[userName]) {
                if (password === localStorage[userName]){
                    location.href = 'index.html';
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
    $("#frm").fadeOut();
    localStorage[userName] = password;
}

          
        
