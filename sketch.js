var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup,obstaclesGroup;

var survivaltime,score;
var ground1;

function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(400, 400);
  
  //console.log(ground.x)
  monkey = createSprite(30,315,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1
 
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
 
  
  survivaltime = 0;
  score = 0;
}

function draw() {
  background("white");

  if(gameState === PLAY)
    {
      ground = createSprite(70,350,800,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
     if (ground.x < 0) {
    ground.x = ground.width / 2; 
     }
      
        if (keyDown("space") && monkey.y>=161) 
        {
    monkey.velocityY = -10; 
  }
    survivaltime =survivaltime +  Math.round(getFrameRate()/60);

  spawnBananas();
  spawnObstacles();
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground); 
      
  stroke("black");
  textSize(30);
  fill("brown");
  text("SURVIVAL TIME : " + survivaltime,50,50);
  
  stroke("black");
  textSize(20);
  fill("green");
  text("score : " + score,250,90);    
  
  if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score = score + 1;
    }
   if(obstacleGroup.isTouching(monkey))
     {
       gameState = END;
     }
    }
   else if(gameState === END)
     {
       monkey.velocityY = 0;
       monkey.visible = false;
       obstacleGroup.setlifetime = 0;
       bananaGroup.setlifetime = 0;
       bananaGroup.destroyEach();
       obstacleGroup.destroyEach();
       stroke("black");
       textSize(35);
       fill("red");
       text("GAME OVER",50,200);
       
       stroke("black");
       textSize(35);
       fill("blue");
       text("MONKEY IS DEAD",50,250);
     }
drawSprites();  
}
function spawnObstacles()
{
  if(frameCount % 150 === 0){
  obstacle = createSprite(390,325,20,20);
  obstacle.y = Math.round(random(325,325));
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1;
  obstacle.velocityX = -4;  
  obstacle.lifetime = 135; 
  obstacleGroup.add(obstacle);  
  }
   
}
function spawnBananas()
{
  if(frameCount % 70 === 0){
  banana = createSprite(390,150,20,20);
  banana.y = Math.round(random(150,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -3;
  banana.lifetime = 135;
  bananaGroup.add(banana);  
  }
}
