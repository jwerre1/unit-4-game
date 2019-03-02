$(document).ready(function() {

// Define global variables.
var crystalValue = [];
var wins = 0;
var losses = 0;
var score = 0;
var targetNumber;
var crystalPictures = ["assets/images/gemOne.jpg", "assets/images/gemTwo.jpg", "assets/images/gemThree.jpg", "assets/images/gemFour.jpg"];

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
        imageCrystal.addClass("crystal-image");
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
        // imageCrystal.addClass("crystal-image");
        // imageCrystal.attr("src", crystalPictures[i]);
        imageCrystal.attr("data-crystalvalue", crystalValue[i]);
        $("#crystals").append(imageCrystal);
    }
}


// added to newRound()
// function assignment() {
//     for (var i = 0; i < crystalPictures.length; i++) {
//         var imageCrystal = $("<img>");
//         imageCrystal.addClass("crystal-image");
//         imageCrystal.attr("src", crystalPictures[i]);
//         imageCrystal.attr("data-crystalvalue", crystalValue[i]);
//         $("#crystals").append(imageCrystal);
//     }
// }

//beginning of game
$("#win-count").text("Wins: " + wins);
$("#loss-count").text("Losses: " + losses);
newRound();
// assignment();

$(".crystal-image").on("click", function() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    score += crystalValue;
        console.log(score);
    $("#score").text("Score: " + score);

    if (score === targetNumber) {
        $("#winloseAlert").text("You win!");
        wins++;
        $("#win-count").text("Wins: " + wins);
        subRound();
      }
  
      else if (score >= targetNumber) {
        $("#winloseAlert").text("You lose.");
        losses++;
        $("#loss-count").text("Losses: " + losses);
        subRound();
      }
  
    });





console.log(targetNumber);
console.log(crystalValue);


})
