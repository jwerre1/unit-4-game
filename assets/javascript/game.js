$(document).ready(function() {

// Define global variables.
var crystalValue = [];
var wins = 0;
var losses = 0;
var score = 0;
var targetNumber;
var crystalPictures = ["assets/images/gemOne.jpg", "assets/images/gemTwo.jpg", "assets/images/gemThree.jpg", "assets/images/gemFour.jpg"];
var winStreak = 0;

var instructions = [
    "You are given a random number at the start of the game.",
    "There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score.",
    "You win the game by matching your total score to the random number; you lose the game if your total score goes above the random number.",
    "The value of each crystal is hidden from you until you click on it.",
    "Each time a new round begins, the vaule of each crystal will change."
];


//FUNCTIONS

//Assigns a randomly assigned value to each crystal. 
function crystalCalc() {
    for (i = 0; i < crystalPictures.length; i++) {
        crystalValue[i] = Math.floor(Math.random() * 12) + 1;
    }

}

//Initially sets-up the page.
function newRound() {
    targetNumber = Math.floor(Math.random() * 102) + 19;
    $("#target-number").text("Target Number: " + targetNumber);
    crystalCalc();

    //For each picture,
    for (var i = 0; i < crystalPictures.length; i++) {
        //assign them an element "Img".
        var imageCrystal = $("<img>");
        //add CSS classes
        imageCrystal.addClass("crystal-image");
        //Needed to reset crystal values with each round (images also reset, though this does not change anything)
        imageCrystal.addClass("resetCrystal" + [i]);
        //Add picture.
        imageCrystal.attr("src", crystalPictures[i]);
        //Assign each picture its value.
        imageCrystal.attr("data-crystalvalue", crystalValue[i]);
        //Adds pictures to the page. 
        $("#crystals").append(imageCrystal);
    }
}

function subRound() {
    score = 0;
    $("#score").text("Score: " + score);
    targetNumber = Math.floor(Math.random() * 102) + 19;
    $("#target-number").text("Target Number: " + targetNumber);
    for (j = 0; j < crystalPictures.length; j++) {
        crystalValue[j] = Math.floor(Math.random() * 12) + 1;
        $(".resetCrystal" + [j]).attr("data-crystalvalue", crystalValue[j])
            console.log(crystalValue)
    }
    for (var i = 0; i < crystalPictures.length; i++) {
        var imageCrystal = $("<img>");
        imageCrystal.removeAttr("data-crystalvalue");
        imageCrystal.attr("data-crystalvalue", crystalValue[i]);
        $("#crystals").append(imageCrystal);
    }
}

//Populate instructions. 
function instruct() {
    for (i = 0; i <instructions.length; i++) {
        $("#instructions").append("<p>" + instructions[i] + "</p>");
    }
}

// BEGINNING OF GAME
$("#title").text("Crystal Collector");
$("#title").addClass("display-4 lailaFont text-center text-vermillion");

$("#winloseAlert").addClass("lailaFont h2 text-vermillion");
$("#winloseAlert").text("Click any crystal to begin.");


$("#target-number").addClass("lailaFont h3 sunshineFont");

$("#score").text("Score: " + 0);
$("#score").addClass("lailaFont h3 sunshineFont");

$("#win-count").addClass("lailaFont h3 sunshineFont");

$("#win-streak").addClass("lailaFont h3 text-vermillion");

$("#loss-count").addClass("lailaFont h3 sunshineFont");

instruct();
$("#instructions").addClass("text-center luckiestFont greyFont")


newRound();

$(".crystal-image").on("click", function() {
    //allows the winloseAlert to be hidden, while also not alerting the spacing of the page
    $("#winloseAlert").css("visibility", "hidden")
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    score += crystalValue;
        console.log(score);
    $("#score").text("Score: " + score);

    // check if you won
    if (score === targetNumber) {
        $("#winloseAlert").css("visibility", "visible")
        $("#winloseAlert").removeClass("text-vermillion");
        $("#winloseAlert").addClass("sunshineFont");
        $("#winloseAlert").text("You win! Keep it up!");
        wins++;
        $("#win-count").text("Wins: " + wins);
        winStreak++;
        $("#win-streak").text("Win Streak: " + winStreak);
        // run new round
        subRound();
      }
      
      // check if you lost
      else if (score >= targetNumber) {
        $("#winloseAlert").css("visibility", "visible")
        $("#winloseAlert").removeClass("sunshineFont");
        $("#winloseAlert").addClass("text-vermillion");
        $("#winloseAlert").text("You lose. Try again!");
        losses++;
        $("#loss-count").text("Losses: " + losses);
        winStreak = 0;
        $("#win-streak").text("");
        // run new round
        subRound();
      }
  
    });
})
