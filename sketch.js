const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground, fruit, rope, fruit_con;

var bg_img;
var food;
var bunny_img;

var button;
var bunny;
var blink, eat, sad;

function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  bunny_img = loadImage('rabbit-01.png');
  blink = loadAnimation('blink_1.png', 'blink_2.png','blink_3.png');
  eat = loadAnimation('eat_0.png', 'eat_1.png','eat_2.png','eat_3.png','eat_4.png');
  sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
}

function setup() {
  createCanvas(600,700);
  frameRate(80);
  
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;


  button = create = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  ground = new Ground(300, 680, 650, 20);

  bunny = createSprite(200,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking", blink);
  bunny.addAnimation("eating", eat);
  bunny.addAnimation("crying", sad);

  bunny.changeAnimation("blinking");


  rope = new Rope(6, {x:220, y:30});

  fruit = Bodies.circle(300, 350, 20);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

}

function draw() {
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!= null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  Engine.update(engine);

  ground.show();
  rope.show();

  if(collide(fruit, bunny)== true){
    bunny.changeAnimation('eating');
  }

  if(collide(fruit, ground.body)== true){
    bunny.changeAnimation('crying');
  }

  drawSprites();

  
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}


function collide(body, sprite)
{
  if(body != null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d <= 80){
      World.remove(world, fruit);
      fruit = null
      return true

    } else{
      return false
    }
  }
}