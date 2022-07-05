const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas;

var player;
var terrainSec1;
var arm;
var title;
var boulder;
var score = 0;

var GameOver = false;

var spears = [];
var enemies = [];

var enemyWalkAnimation = [];
var enemyWalkSpritedata, enemyWalkSpritesheet;

var enemyDeathAnimation = [];
var enemyDeathSpritedata, enemyDeathSpritesheet;


function preload() {
  backgroundImg = loadImage("assets/finale_city_bg.png");

  enemyWalkSpritesheet = loadImage("assets/zombie_sprite_sheet_walk-removebg-preview.png");
  enemyWalkSpritedata = loadJSON("json/enemyWalk.json");

  enemyDeathSpritesheet = loadImage("assets/zombie_death_sprite_sheet-transformed-removebg-preview.png");
  enemyDeathSpritedata = loadJSON("json/enemyWalk.json");
}



function setup() {

  canvas = createCanvas(1500, 700);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15




  player = new Player(160, 525, 125, 200);
  arm = new Arm(115, 516, 30, 100);

  terrainSec1 = new Terrain(750, 620, 1500, 10);

  var enemyFrames = enemyWalkSpritedata.frames;
  for (var i = 0; i < enemyFrames.length; i++) {
    var pos = enemyFrames[i].position;
    var img = enemyWalkSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    enemyWalkAnimation.push(img);
  }

  var enemyDeathFrames = enemyDeathSpritedata.frames;
  for (var i = 0; i < enemyDeathFrames.length; i++) {
    var pos = enemyDeathFrames[i].position;
    var img = enemyDeathSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    enemyDeathAnimation.push(img);
  }



}


function draw() {
  background(200);
  image(backgroundImg, 0, 0, width, height);


  terrainSec1.display();
  player.display();
  arm.display();

  Engine.update(engine);


  fill("red");
  textSize(40);
  text(`Score:${score}`, width - 120, 50);
  textAlign(CENTER, CENTER);

  textSize(100);
  stroke(100);
  fill("black")
  text("Zombie survival!!!", 750, 100);
  textAlign(CENTER, CENTER);

  showEnemies();

  for (var i = 0; i < spears.length; i++) {
    showSpears(spears[i], i);
    collisionWithEnemy(i);
  }

}


function keyPressed() {
  if (keyDown("space")) {
    var spear = new Projectile(arm.x, arm.y);
    spear.trajectory = [];
    Matter.Body.setAngle(spear.body, arm.angle);
    spears.push(spear);
  }
}

function fire() {
  if (keyCode === 32 && !isGameOver) {
    spears[spears.length - 1].throw();
  }

}

function showSpears(spear, index) {
  if (spear) {
    spear.display();
    spear.animate();
    if (spear.body.position.x >= width || spear.body.position.y >= heigth - 35) {
      spear.remove(index);
    }
  }
}

function showEnemies() {
  if (enemies.length > 0) {
    if (enemies.length < 5 && enemies[enemies.length - 1].body.position.x < width - 200) {
      var positions = [-50, -60, -70, -80];
      var position = random(positions);
      var enemy = new Enemy(width, height - 150, 80, 120, position, enemyWalkAnimation);
      enemies.push(enemy);
    }

    for (var i = 0; i < enemies.length; i++) {
      Matter.Body.setVelocity(enemies[i].body, { x: -1, y: 0 });

      enemies[i].display();
      //enemies[i].animate();
      var collision = Matter.SAT.collides(this.player, enemies[i].body);
      if (collision.collided && !enemies[i].isDead) {
        gameOver = true;
        endGame();
      }
    }
  } else {
    var enemy = new Enemy(width, height - 60, 170, 170, -60, enemyWalkAnimation);
    enemies.push(enemy);
  }

}

function collisionWithEnemy(index) {
  for (var i = 0; i < enemies.length; i++) {
    if (spears[index] !== undefined && enemies[i] !== undefined) {
      var collision = Matter.SAT.collides(spears[index].body, enemies[i].body);

      if (collision.collided) {
        score += 5
        enemies[i].remove(i);

        Matter.World.remove(world, spears[index].body);
        delete spears[index];
      }
    }
  }
}

function endGame() {
  swal({
    title: `GAME OVER!!!`,
    text: "Better luck next time.",
    imageSize: "150x150",
    confrimBttonText: "Play Again"
  },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  )
}



