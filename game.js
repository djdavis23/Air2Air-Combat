
//HTML IMAGE ELEMENTS
const redForceImage = document.getElementById("red-force-img");
const blueForceImage = document.getElementById("blue-force-img");

//HTML GAME STATUS ELEMENTS
const advHealth = document.getElementById("health");
const rounds = document.getElementById("rounds");
const sidewinders = document.getElementById("sidewinders");
const amraam = document.getElementById("amraam");


//HTML BUTTON ELEMENTS
const gunButton = document.getElementById("gun-button");
const sidewinderButton = document.getElementById("sidewinder-button");
const amraamButton = document.getElementById("amraam-button");

//AVAILABLE ENEMY AIRCRAFT
let redForces = [
  {
    name: 'MIG-29',
    lifeExp: 100,
    health: 100,
    imgs: [
      'assets/Mig29.jpg',
      'assets/damaged.gif',
      'assets/exploded.jpg'
    ],
    evasiveAction: false,
    chaffActive: false,
    flareActive: false,
    imgIndex: 0
  },
  {
    name: 'MIG-35',
    lifeExp: 100,
    health: 100,
    imgs: [
      'assets/Mig35.jpg',
      'assets/damaged.gif',
      'assets/exploded.jpg'
    ],
    evasiveAction: false,
    chaffActive: false,
    flareActive: false,
    imgIndex: 0
  },
  {
    name: 'Red Baron',
    lifeExp: 80,
    health: 80,
    imgs: [
      'assets/redbaron.jpg',
      'assets/damagedBaron.gif',
      'assets/exploded.jpg'
    ],
    evasiveAction: false,
    chaffActive: false,
    flareActive: false,
    imgIndex: 0
  }
];

//AVAILABLE FRIENDLY AIRCRAFT
let blueForces = [
  {
    name: 'F-15',
    cannonCap: 6000,
    numRounds: 6000,
    sidewinderCap: 4,
    numSidewinders: 4,
    amraamCap: 2,
    numAmraams: 2,
    imgs: [
      'assets/F-15.jpg',
      'assets/victory.gif'
    ],
    imgIndex: 0
  },
  {
    name: 'F-22',
    cannonCap: 9000,
    numRounds: 9000,
    sidewinderCap: 4,
    numSidewinders: 4,
    amraamCap: 4,
    numAmraams: 4,
    imgs: [
      'assets/f22.jpg',
      'assets/victory.gif'
    ],
    imgIndex: 0
  },
  {
    name: 'Snoopy',
    cannonCap: 6000,
    numRounds: 6000,
    sidewinderCap: 2,
    numSidewinders: 2,
    amraamCap: 2,
    numAmraams: 2,
    imgs: [
      'assets/snoopy.jpg',
      'assets/snoopyvictory.gif'
    ],
    imgIndex: 0
  }
]

var activeRedForce = redForces[0];
var activeBlueForce = blueForces[0];

function fireCannon() {
  let damage = 2;
  if (activeRedForce.evasiveAction) {
    damage = Math.round(Math.random() * damage);
  }
  activeRedForce.health -= damage;
  activeBlueForce.numRounds -= 100;
  if (activeBlueForce.numRounds <= 0) {
    gunButton.setAttribute('disabled', 'true');
  }
  assessDamage();
  draw();
}

function launchSidewinder() {
  let damage = 10;
  if (activeRedForce.flareActive) {
    damage = Math.round(Math.random() * damage);
  }
  activeRedForce.health -= damage;
  activeBlueForce.numSidewinders -= 1;
  if (activeBlueForce.numSidewinders <= 0) {
    sidewinderButton.setAttribute('disabled', 'true');
  }
  assessDamage();
  draw()
}

function launchAmraam() {
  let damage = 20;
  if (activeRedForce.chaffActive) {
    damage = Math.round(Math.random() * damage);
  }
  activeRedForce.health -= damage;
  activeBlueForce.numAmraams -= 1;
  if (activeBlueForce.numAmraams <= 0) {
    amraamButton.setAttribute('disabled', 'true');
  }
  assessDamage();
  draw();
}

function assessDamage() {
  if (activeRedForce.health <= 0) {
    activeBlueForce.imgIndex = 1;
    activeRedForce.imgIndex = 2;
  }
  else if (activeRedForce.health <= 20) {
    activeRedForce.imgIndex = 1;
  }
}

function evasiveAction() {
  activeRedForce.evasiveAction = true;
  activeRedForce.chaffActive = false;
  activeRedForce.flareActive = false;
}

function dispenseChaff() {
  activeRedForce.evasiveAction = false;
  activeRedForce.chaffActive = true;
  activeRedForce.flareActive = false;
}

function dispenseFlare() {
  activeRedForce.evasiveAction = false;
  activeRedForce.chaffActive = false;
  activeRedForce.flareActive = true;
}

function draw() {
  redForceImage.setAttribute('src', activeRedForce.imgs[activeRedForce.imgIndex]);
  blueForceImage.setAttribute('src', activeBlueForce.imgs[activeBlueForce.imgIndex]);
  advHealth.innerText = activeRedForce.health.toString();
  rounds.innerText = activeBlueForce.numRounds.toString();
  sidewinders.innerText = activeBlueForce.numSidewinders.toString();
  amraam.innerText = activeBlueForce.numAmraams.toString();
}

draw();

