$(document).ready(function() {

// Define global variables.
var gemValue = [];
var wins = 0;
var losses = 0;
var score = 0;
var targetNumber;
var gemPictures = ["assets/images/gemOne.jpg", "assets/images/gemTwo.jpg", "assets/images/gemThree.jpg", "assets/images/gemFour.jpg"];

function gemCalc() {
    for (i = 0; i < gemPictures.length; i++) {
        var worth = Math.floor(Math.random() * 12) + 1;
        gemValue.push(worth);
    }
 
    // if (gemValue[0] % 2 === gemValue[1] % 2 === gemValue[2] % 2 === gemValue[3] % 2 === 100) {
    //     gemCalc();
    // }

}

function newRound() {
    targetNumber = Math.floor(Math.random() * 102) + 19;

    gemCalc()
}

function assignment() {
    for (var i = 0; i < gemPictures.length; i++) {
        var imageCrystal = $("<img>");
        imageCrystal.addClass("crystal-image");
        imageCrystal.attr("src", gemPictures[i]);
        imageCrystal.attr("data-crystalvalue", gemValue[i]);
        $("#crystals").append(imageCrystal);
    }



}

newRound();
assignment();

console.log(targetNumber);
console.log(gemValue)

})
