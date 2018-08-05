var health = 100;
var numAmraams = 2;
var numSidewinders = 4;
var numRounds = 6000;

const advHealth = document.getElementById("health");
const rounds = document.getElementById("rounds");
const sidewinders = document.getElementById("sidewinders");
const amraam = document.getElementById("amraam");

const gunButton = document.getElementById("gun-button");
const sidewinderButton = document.getElementById("sidewinder-button");
const amraamButton = document.getElementById("amraam-button");

function fireCannon() {
  health -= 2;
  numRounds -= 100;
  if (numRounds <= 0) {
    gunButton.setAttribute('disabled', 'true');
  }
  draw();
}

function launchSidewinder() {
  health -= 10;
  numSidewinders -= 1;
  if (numSidewinders <= 0) {
    sidewinderButton.setAttribute('disabled', 'true');
  }
  draw()
}

function launchAmraam() {
  health -= 20;
  numAmraams -= 1;
  if (numAmraams <= 0) {
    amraamButton.setAttribute('disabled', 'true');
  }
  draw();
}

function draw() {
  advHealth.innerText = health.toString();
  rounds.innerText = numRounds.toString();
  sidewinders.innerText = numSidewinders.toString();
  amraam.innerText = numAmraams.toString();
}

draw();

