
//HTML IMAGE ELEMENTS
const redForceImage = document.getElementById("red-force-img");
const blueForceImage = document.getElementById("blue-force-img");

//HTML GAME STATUS ELEMENTS
const advHealth = document.getElementById("health");
const rounds = document.getElementById("rounds");
const sidewinders = document.getElementById("sidewinders");
const amraam = document.getElementById("amraam");
const healthProg = document.getElementById("health-prog");
const roundsProg = document.getElementById("rounds-prog");
const sidewinderProg = document.getElementById("sidewinder-prog");
const amraamProg = document.getElementById("amraam-prog");
const statusBlock = document.getElementById('status-block');


//HTML BUTTON ELEMENTS
const gunButton = document.getElementById("gun-button");
const sidewinderButton = document.getElementById("sidewinder-button");
const amraamButton = document.getElementById("amraam-button");
const btnArray = document.getElementsByTagName('button');
const redButtons = document.getElementById('red-buttons');
const blueButtons = document.getElementById('blue-buttons');

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
      'assets/baronexploded.jpg'
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
      'assets/f15.jpg',
      'assets/victory.gif',
      'assets/defeat.gif',
      'assets/missilefire.gif',
      'assets/cannonfire.gif'
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
      'assets/victory.gif',
      'assets/defeat.gif',
      'assets/missilefire.gif',
      'assets/cannonfire.gif'
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
      'assets/snoopyvictory.gif',
      'assets/snoopydefeat.gif',
      'assets/snoopyguns.gif',
      'assets/snoopyguns.gif'
    ],
    imgIndex: 0
  }
]

//ACTIVE AIRCRAFT VARIABLES, DEFAULT SET IN CASE USER DOES NOT SELECT
var activeRedForce = redForces[0];
var activeBlueForce = blueForces[0];
var statusMessage = "GAME ON!";

//ALLOWS USER TO SELECT RED FORCES ADVERSARY
function setRedForce(selection) {
  activeRedForce = redForces.find(target => target.name == selection);
  draw();
}

//ALLOWS USER TO SELECT HIS OR HER AIRCRAFT
function setBlueForce(selection) {
  activeBlueForce = blueForces.find(target => target.name == selection);
  draw();
}


//FIRES VULCAN CANNON, UPDATES ROUNDS REMAINING AND ADVERSARY HEALTH
function fireCannon() {
  let damage = 2;
  //modify damage if evasive action is taken by adversary
  if (activeRedForce.evasiveAction) {
    damage = Math.round(Math.random() * damage);
  }
  //temporarily show jet firing missiles
  activeBlueForce.imgIndex = 4;
  draw();
  //update health and missile inventory
  activeRedForce.health -= damage;
  activeBlueForce.numRounds -= 1;
  let temp = setTimeout(update, 2000);
}

//FIRES SIDEWINDER, UDPATES SIDEWINDERS REMAINING AND ADVERSARY HEALTH
function launchSidewinder() {
  let damage = 10;
  //modify damage if adversary dispenses flares
  if (activeRedForce.flareActive) {
    damage = Math.round(Math.random() * damage);
  }
  //temporarily show jet firing missiles
  activeBlueForce.imgIndex = 3;
  draw();
  //update health and missile inventory
  activeRedForce.health -= damage;
  activeBlueForce.numSidewinders -= 1;
  let temp = setTimeout(update, 1000);
}

//FIRES AMRAAM, UPDATES AMRAAMS REMAINING AND ADVERSARY HEALTH
function launchAmraam() {
  let damage = 20;
  //modify damage if adversary dispenses chaff
  if (activeRedForce.chaffActive) {
    damage = Math.round(Math.random() * damage);
  }
  //temporarily show jet firing missiles
  activeBlueForce.imgIndex = 3;
  draw();
  //update health and missile inventory
  activeRedForce.health -= damage;
  activeBlueForce.numAmraams -= 1;
  let temp = setTimeout(update, 1000);
}



//UPDATES UI ELEMENTS BASED ON GAME PLAY
function update() {

  //if adversary health goes to zero, player wins
  if (activeRedForce.health <= 0) {
    activeBlueForce.imgIndex = 1;
    activeRedForce.imgIndex = 2;
    statusMessage = "YOU WIN!!!"
    statusBlock.className = "text-success"
    //disable all buttons except for reset
    for (let i = 0; i < btnArray.length; i++) {
      const button = btnArray[i];
      if (button.id != 'reset-btn') {
        button.disabled = true;
      }
    }
  }
  //if the player runs out of ammo without killing target, player loses
  else if (activeBlueForce.numRounds == 0 && activeBlueForce.numAmraams == 0 && activeBlueForce.numSidewinders == 0) {
    statusMessage = "NO AMMO - YOU LOSE!!!";
    statusBlock.className = "text-danger";
    activeBlueForce.imgIndex = 2;
    for (let i = 0; i < btnArray.length; i++) {
      const button = btnArray[i];
      if (button.id != 'reset-btn') {
        button.disabled = true;
      }
    }
  }
  //when adversary health goes below 20, aircraft is crippled
  else if (activeRedForce.health <= 20) {
    activeRedForce.imgIndex = 1;
    activeBlueForce.imgIndex = 0;
    statusMessage = "ADVERSARY SEVERELY DAMAGED!!!"
    statusBlock.className = "text-warning"
  }
  else {
    activeBlueForce.imgIndex = 0;
  }

  //if all rounds are used, disable the cannon attack button
  if (activeBlueForce.numRounds <= 0) {
    gunButton.setAttribute('disabled', 'true');
  }
  //if all sidewinders used, disable attack button
  if (activeBlueForce.numSidewinders <= 0) {
    sidewinderButton.setAttribute('disabled', 'true');
  }
  //if all AMRAAMs used, disable attack button
  if (activeBlueForce.numAmraams <= 0) {
    amraamButton.setAttribute('disabled', 'true');
  }
  draw();
}

// NOTE:  In this initial version of the game, only one defensive measure is active 
// at any given time.  Also, each defense only affects one attack mode.  However, 
// the user has unlimited reserves of both chaff and flares.  

//TOGGLES EVASIVE ACTION TO TRUE, DEACTIVATES OTHER DEFENSES
function evasiveAction() {
  activeRedForce.evasiveAction = true;
  activeRedForce.chaffActive = false;
  activeRedForce.flareActive = false;
}

//TOGGLES CHAFF TO TRUE, DEACTIVATES OTHER DEFENSES
function dispenseChaff() {
  activeRedForce.evasiveAction = false;
  activeRedForce.chaffActive = true;
  activeRedForce.flareActive = false;
}

//TOGGLES FLARES TO TRUE, DEACTIVATES OTHER DEFENSES
function dispenseFlare() {
  activeRedForce.evasiveAction = false;
  activeRedForce.chaffActive = false;
  activeRedForce.flareActive = true;
}

//RENDERS UPDATES TO WEBPATE
function draw() {
  //update images
  redForceImage.setAttribute('src', activeRedForce.imgs[activeRedForce.imgIndex]);
  blueForceImage.setAttribute('src', activeBlueForce.imgs[activeBlueForce.imgIndex]);
  //update status block
  healthProg.style.width = ((activeRedForce.health / activeRedForce.lifeExp) * 100).toString() + '%';
  roundsProg.style.width = ((activeBlueForce.numRounds / activeBlueForce.cannonCap) * 100).toString() + '%';
  sidewinderProg.style.width = ((activeBlueForce.numSidewinders / activeBlueForce.sidewinderCap) * 100).toString() + '%';
  amraamProg.style.width = ((activeBlueForce.numAmraams / activeBlueForce.amraamCap) * 100).toString() + '%';
  advHealth.innerText = activeRedForce.health.toString();
  rounds.innerText = activeBlueForce.numRounds.toString();
  sidewinders.innerText = activeBlueForce.numSidewinders.toString();
  amraam.innerText = activeBlueForce.numAmraams.toString();
  statusBlock.innerText = statusMessage;
}

//DRAWS BUTTONS FOR EACH AVAILABLE AIRCRAFT FOR THE PLAYER TO SELECT
function drawButtons() {
  //draw red force buttons
  let redTemplate = ""
  for (let i = 0; i < redForces.length; i++) {
    const target = redForces[i];
    redTemplate += `
    <button type="button" class="btn btn-danger mb-3" onclick= "setRedForce('${target.name}')">${target.name}
    </button>
  `;
  }
  redButtons.innerHTML = redTemplate;

  //draw blue force buttons
  let blueTemplate = ""
  for (let i = 0; i < blueForces.length; i++) {
    const target = blueForces[i];
    blueTemplate += `
    <button type="button" class="btn btn-info mb-3" onclick= "setBlueForce('${target.name}')">${target.name}
    </button>
  `;
  }
  blueButtons.innerHTML = blueTemplate;
}

//RESETS ALL ELEMENTS TO STARTING STATUS
function reset() {
  //reset blue force attributes to starting status
  activeBlueForce.imgIndex = 0;
  activeBlueForce.numRounds = activeBlueForce.cannonCap;
  activeBlueForce.numSidewinders = activeBlueForce.sidewinderCap;
  activeBlueForce.numAmraams = activeBlueForce.amraamCap;

  //reset red force attributes to starting status
  activeRedForce.imgIndex = 0;
  activeRedForce.health = activeRedForce.lifeExp;
  activeRedForce.evasiveAction = false;
  activeRedForce.flareActive = false;
  activeRedForce.chaffActive = false;

  //reset status window
  statusMessage = "GAME ON!";
  statusBlock.className = 'text-info';

  //enable all buttons
  for (let i = 0; i < btnArray.length; i++) {
    const button = btnArray[i];
    button.disabled = false;
  }
  //redraw user interface
  draw();
  drawButtons();
}
//initial draw for user interface
draw();
drawButtons();