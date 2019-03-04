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
    "You will be given a random number at the start of the game.",
    "There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score.",
    "You win the game by matching your total score to the random number; you lose the game if your total score goes above the random number.",
    "The value of each crystal is hidden from you until you click on it.",
    "Each time a new round begins, the vaule of each crystal will change."
];


//FUNCTIONS

function crystalCalc() {
    // crystalValue.length = 0;
    for (i = 0; i < crystalPictures.length; i++) {
        crystalValue[i] = Math.floor(Math.random() * 12) + 1;
        // crystalValue.push(worth);
    }
 
    // if (crystalValue[0] % 2 === crystalValue[1] % 2 === crystalValue[2] % 2 === crystalValue[3] % 2 === 100) {
    //     crystalCalc();
    // }

}

function newRound() {
    targetNumber = Math.floor(Math.random() * 102) + 19;
    $("#target-number").text("Target Number: " + targetNumber);
    crystalCalc();
    // for (j = 0; j < crystalPictures.length; j++) {
    //     var worth = Math.floor(Math.random() * 12) + 1;
    //     crystalValue.push(worth);
    // }
    for (var i = 0; i < crystalPictures.length; i++) {
        var imageCrystal = $("<img>");
        //for css
        imageCrystal.addClass("crystal-image border border-dark");
        //so the crystal values are reset with each round (images also reset, though this does not change anything)
        imageCrystal.addClass("resetCrystal" + [i]);
        imageCrystal.attr("src", crystalPictures[i]);
        imageCrystal.attr("data-crystalvalue", crystalValue[i]);
        $("#crystals").append(imageCrystal);
    }
}

function subRound() {
    score = 0;
    $("#score").text("Score: " + score);
    targetNumber = Math.floor(Math.random() * 102) + 19;
    $("#target-number").text("Target Number: " + targetNumber);
    // crystalCalc();
    for (j = 0; j < crystalPictures.length; j++) {
        crystalValue[j] = Math.floor(Math.random() * 12) + 1;
        $(".resetCrystal" + [j]).attr("data-crystalvalue", crystalValue[j])
            console.log(crystalValue)
    }
    for (var i = 0; i < crystalPictures.length; i++) {
        var imageCrystal = $("<img>");
        imageCrystal.removeAttr("data-crystalvalue");
        // not needed, otherwise four more crystals appear with each round
        // imageCrystal.addClass("crystal-image");
        // imageCrystal.attr("src", crystalPictures[i]);
        imageCrystal.attr("data-crystalvalue", crystalValue[i]);
        $("#crystals").append(imageCrystal);
    }
}

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

$("#win-count").text("Wins: " + wins);
$("#win-count").addClass("lailaFont h3 sunshineFont");

$("#win-streak").addClass("lailaFont h3 text-vermillion");

$("#loss-count").text("Losses: " + losses);
$("#loss-count").addClass("lailaFont h3 sunshineFont");
instruct();
$("#instructions").addClass("text-center luckiestFont greyFont")


newRound();
// assignment();

$(".crystal-image").on("click", function() {
    //allows the winloseAlert to be hidden, while also not alerting the spacing of the page
    $("#winloseAlert").css("visibility", "hidden")
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    score += crystalValue;
        console.log(score);
    $("#score").text("Score: " + score);

    if (score === targetNumber) {
        $("#winloseAlert").css("visibility", "visible")
        $("#winloseAlert").removeClass("text-vermillion");
        $("#winloseAlert").addClass("sunshineFont");
        $("#winloseAlert").text("You win! Keep it up!");
        wins++;
        $("#win-count").text("Wins: " + wins);
        winStreak++;
        $("#win-streak").text("Win Streak: " + winStreak);

        subRound();
      }
  
      else if (score >= targetNumber) {
        $("#winloseAlert").css("visibility", "visible")
        $("#winloseAlert").removeClass("sunshineFont");
        $("#winloseAlert").addClass("text-vermillion");
        $("#winloseAlert").text("You lose. Try again!");
        losses++;
        $("#loss-count").text("Losses: " + losses);
        winStreak = 0;
        $("#win-streak").text("");
        subRound();
      }
  
    });
})
