$(document).ready(function() {
var startButton;
var showTimeAndQuiz;
var questions = [
    "That one Hermione keeps using to unlock doors when they go sneaking around in the first book",
    "Gets rid of pesky Dementors by summoning a badass Patronus to chase them away",
    "This spell, used by Lord Voldemort and his Death Eaters, conjures onto the sky the Dark Mark, Voldemort's symbol",
    "It summons objects to the caster, and despite not being visually stunning or particularly combat applicable",
    "A mouthful of a curse invented by troubled teen Severus Snape",
    "Basically the only spell Harry ever uses when he's in a duel"
];
var choices = [
    ["Anteoculatia", "Defodio", "Alohomora", "Anapneo"],
    ["Ferula", "Expecto Patronum", "Aguamenti", "Locomotor Wibbly"],
    ["Magicus Extremos", "Morsmordre", "Entomorphis", "Cantis"],
    ["Accio", "Glacius Tria", "Calvario", "Verdimillious"],
    ["Carpe Retractum",  "Geminio", "Fiendfyre", "Sectumsempra"],
    ["Engorgio", "Salvio Hexia", "Expelliarmus", "Vera Verto"]

];

var correctAnswers = ["C. Alohomora","B. Expecto Patronum","B. Morsmordre", "A. Accio", "D. Sectumsempra", "C. Expelliarmus"];
var imageShow = [
    "<img class='center-block image' src='assets/images/Unlocking.gif'>", 
    "<img class='center-block image' src='assets/images/ExpectoPatronum.gif'>", 
    "<img class='center-block image' src='assets/images/Morsmordre.gif'>", 
    "<img class='center-block image' src='assets/images/Accio_cup.gif'>", 
    "<img class='center-block image' src='assets/images/Sectumsempra.gif'>", 
    "<img class='center-block image' src='assets/images/expelliarmus.gif'>"
];
var clock;
var counter = 30; 
var questionCounter = 0;
var selectedAnswer;
var correctTotal = 0;
var incorrectTotal = 0;
var unansweredTotal = 0;


//create start button
function startGame(){
    startButton = "<button class='start-button text-center'>START QUIZ!</button>" ;
    $('#main').html(startButton);
}
startGame();

//on click function start button that run quizzes
$("body").on("click", ".start-button", function(event){
    event.preventDefault();
    quizGamePlay();  //run quiz functions
    timer() // run timing
});


//generate quizzes
function quizGamePlay(){
    showTimeAndQuiz = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p>"
    +"<p class='text-center'>" + questions[questionCounter] + "</p>"
    +"<p class='first-answer answer text-center'>A. " + choices[questionCounter][0] + "</p>"
    +"<p class='answer text-center'>B. "+choices[questionCounter][1]+"</p>"
    +"<p class='answer text-center'>C. "+choices[questionCounter][2]+"</p>"
    +"<p class='answer text-center'>D. "+choices[questionCounter][3]+"</p>";
    $('#main').html(showTimeAndQuiz)
}
// set timer
function timer(){
    clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			LossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

// not select answer
function LossDueToTimeOut() {
	unansweredTotal++;
	showTimeAndQuiz = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Sadface.gif'>";
	$("#main").html(showTimeAndQuiz);
	setTimeout(wait, 2000);
}

// track wins
function countWins() {
	correctTotal++;
	showTimeAndQuiz = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Good Job! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageShow[questionCounter];
	$("#main").html(showTimeAndQuiz);
	setTimeout(wait, 2000);  
}

//track losses
function countLosses() {
	incorrectTotal++;
	showTimeAndQuiz = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/Sadface.gif'>";
	$("#main").html(showTimeAndQuiz);
	setTimeout(wait, 2000);
}

function wait() {
	if (questionCounter < 5) {
	questionCounter++;
	quizGamePlay();
	counter = 30;
	timer();
	}
	else {
	    finalResult();
	}
}

// on click funciton, select the answer
$("body").on("click", ".answer", function(event){

	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {

		clearInterval(clock);
		countWins();
	}
	else {
		clearInterval(clock);
		countLosses();
	}
}); 


//show result
function finalResult() {
    showTimeAndQuiz ="<h1 class='text-center'>-- End Game --</h1>"+ "<p class='text-center'>All done, here's how you did!" + "</p>" 
    + "<p class='summary-correct'>Correct Answers: " + correctTotal + "</p>" 
    + "<p>Wrong Answers: " + incorrectTotal + "</p>" + "<p>Unanswered: " + unansweredTotal + "</p>" 
    + "<button class='reset-button text-center'>RESET THE QUIZ</button>";
	$("#main").html(showTimeAndQuiz);
}

//reset
$("body").on("click", ".reset-button", function(event){
	resetGame();
});

function resetGame() {
	questionCounter = 0;
	correctTotal = 0;
	incorrectTotal = 0;
	unansweredTotal = 0;
	counter = 30;
	quizGamePlay();
	timer();
}

});


