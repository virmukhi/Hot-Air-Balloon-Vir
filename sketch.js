var balloon, balloonAnimation;
var bckImage;
var database, position;

var edges;

function preload() {
  bckImage = loadImage("Hot Air Ballon-01.png")
  balloonAnimation = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1000, 500);

  balloon = createSprite(250, 200, 50, 50);
  balloon.addAnimation("balloon", balloonAnimation);
  balloon.scale = 0.5;

  database = firebase.database();

  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value", readPosition);

  edges = createEdgeSprites();

}

function draw() {
  background(bckImage);

  balloon.collide(edges);

  fill("black");
  text("** Use arrow keys to move the air balloon",50,40);

  if (keyDown("left")) {
    writePosition(-5, 0);
  }

  else if (keyDown("right")) {
    writePosition(5, 0);
  }

  else if (keyDown("up")) {
    writePosition(0, -5);
    balloon.scale-=0.008;
  }

  else if (keyDown("down")) {
    writePosition(0, 5);
    balloon.scale+=0.008;
  }


  drawSprites();
}

function readPosition(data) {
  position = data.val();

  balloon.x = position.x;
  balloon.y = position.y;

}


function writePosition(x, y) {

  database.ref("balloon/position").update({x: balloon.x+x, y: balloon.y+y})

}