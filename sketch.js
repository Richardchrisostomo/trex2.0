var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var aleatorio;
var nuvem,imagemnuvem;
var gruptrex,grupN;
var modojogo="jogando"
var jump 
var die
var checkpoint
var pontos=0
function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_colidiu = loadImage("trex_collided.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemnuvem = loadImage("cloud.png");
 
  ops2image = loadImage("obstacle1.png")
  ops3image = loadImage("obstacle2.png")
  ops4image = loadImage("obstacle3.png")
  ops5image = loadImage("obstacle4.png")
  ops6image = loadImage("obstacle5.png")
  ops7image = loadImage("obstacle6.png")
  fimimage = loadImage("gameOver.png")
  inicio = loadImage("restart.png") 
  jump = loadSound("jump.mp3")
  checkpoint =loadSound ("checkPoint.mp3")
  die =loadSound ("die.mp3")
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("estop",trex_colidiu);
  trex.scale = 0.5;
  
  //criar um sprite do solo
  solo = createSprite(width/2,height/2,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  
  
  //creating invisible ground
  soloinvisivel = createSprite(width/2,height/2+10,width,10);
  soloinvisivel.visible = false;
  
  //criando numero aleatorio
  aleatorio = Math.round(random(100,200));
  console.log(aleatorio);
  //criando grupos 
  gruptrex=new Group();  
  grupN=new Group();
trex.setCollider("circle",0,0,30)
trex.debug=true;  
fim = createSprite(width/2,height/2-150);
fim.addImage(fimimage)
fim.scale=0.6;
inicio2= createSprite(width/2,height/2-100)
inicio2.addImage(inicio)
inicio2.scale=0.6;
fim.visible=false;
inicio2.visible=false;

}

function draw() {
 if(mousePressedOver(inicio2)){
 modojogo="jogando"  
 gruptrex.destroyEach()
 fim.visible=false;
 inicio2.visible=false;
 grupN.destroyEach();
 trex.changeAnimation("running")
 pontos=0;
 frameCount=0;
 } 
  
  
  
  //definir cor de fundo
  background("black");
if(modojogo=="jogando"){  
if(pontos%100==0&&pontos>0){
checkpoint.play();  
}
  console.log(trex.y);
  pontos=pontos+Math.round(frameCount/120)
  solo.velocityX=-(4+pontos/100);
 // pular quando a tecla espaço é acionada
  if(keyDown("space")&& trex.y >= 170) {
    trex.velocityY = -13;
  jump.play();
  }
  if (solo.x < 0){
    solo.x = solo.width/2;

  }
gerarNuvens();
  ops();
  
  trex.velocityY = trex.velocityY + 0.8;
if(gruptrex.isTouching(trex)){
modojogo="fim";  
trex.velocityY = 0;
trex.changeAnimation("estop")
die.play();
}
}  

  if(modojogo=="fim"){
solo.velocityX=0;
grupN.setVelocityXEach(0);
gruptrex.setVelocityXEach(0);
gruptrex.setLifetimeEach(-6);
grupN.setLifetimeEach(-6);  
fim.visible=true;  
inicio2.visible=true; 
  }  
  
 
  
  
  
  
  
  //impedir o trex de cair 
  trex.collide(soloinvisivel);

  
  drawSprites();
fill(rgb(255,0,0))
textSize(20)
text(pontos,40,40);  


}


function gerarNuvens(){
  
  if(frameCount%80==0){
  nuvem = createSprite(0,100);
  nuvem.addImage(imagemnuvem);
  nuvem.velocityX = 2;
  nuvem.y=random(10,160);
  nuvem.lifetime=400;
  nuvem.depth=1;
  trex.depth=2;
  grupN.add(nuvem);
  
  }
  
  
}
function ops(){

if(frameCount%120==0){ 
ops1=createSprite(width,height/2-20);
ops1.velocityX=-(4+pontos/100);
  var aleatorio = Math.round(random(1,6));
inicio2.depth=2;  
ops1.depth=1;  
  switch(aleatorio){
    case 1: ops1.addImage(ops2image);
            break;
   case 2:  ops1.addImage(ops3image);
            break;
  case 3:   ops1.addImage(ops4image);
            break;
  case 4:   ops1.addImage(ops5image);
            break;
  case 5:   ops1.addImage(ops6image);
            break;
  case 6:   ops1.addImage(ops7image);
  }
ops1.scale=0.6;
ops1.lifetime=400;
gruptrex.add(ops1);


  
  
  
} 
}
