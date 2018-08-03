var health = 100;

const advHealth = document.getElementById("health");
function draw() {
  advHealth.innerText = health.toString();
}

function attack(damage) {
  health -= damage;
  draw();
}

draw();

