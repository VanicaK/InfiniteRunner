var runner, runnerImg, runnerAnm;
var backdrop, backdropImg;
var invisGround;
var enemyImg, enemyG;
var gameState = "wait";
var score = 0;
var enemy;

function preload() {
    runnerImg = loadAnimation("CharacterIdle.png");
    runnerAnm = loadAnimation("CharacterRunning.png", "CharacterRunningPart2.png");
    backdropImg = loadImage("background.png");
    enemyImg = loadImage("EnemyUnit.png");
}

function setup() {
    createCanvas(800, 300);
    backdrop = createSprite(400, 150, 800, 300);
    backdrop.addImage(backdropImg);
    runner = createSprite(35, 225, 10, 10);

    enemy = createSprite(850, 225, 10, 10);
    enemyG = new Group();

    runner.addAnimation("ru", runnerImg);
    runner.addAnimation("ra", runnerAnm);
    runner.scale = 0.15;
    runner.setCollider("rectangle", 0, 0, 300, 600)

    invisGround = createSprite(400, 280, 800, 5);
    invisGround.visible = false;


}

function draw() {
    background("red");

    enemy = createSprite(850, 225, 10, 10);

    runner.collide(invisGround);




    if (gameState === "play") {
        runner.changeAnimation("ra");
        backdrop.velocityX = -3;
        if (backdrop.x < 0) {
            backdrop.x = 800;
        }
        if (keyDown("space") && runner.y > 220) {
            runner.velocityY = -8;
        }
        runner.velocityY += 0.2;
        if (frameCount % (Math.round(random(300, 450))) === 0) {
            enemies();
            score+=1;
        }


        if (runner.isTouching(enemyG)) {
            gameState = "end"
        }
        
        /*if (enemy.lifetime === 0) {
            score += 1;
        }*/
        
    }

    drawSprites();

    if (gameState === "end") {
        runner.changeAnimation("ru");
        runner.velocityY=0;
        backdrop.velocityX = 0;
        enemyG.setVelocityXEach(0);
        enemy.lifetime=-1;
        fill("red");
        stroke("red");
        text("Press Space To Restart!", 340, 150);
        if(keyDown("space")){
            enemyG.destroyEach();
            score=0;
            gameState="play";
        }
    }

 
    if (gameState === "wait") {
        fill("red");
        stroke("red");
        text("Press Space To Start!", 340, 150);
        if (keyDown("space")) {
            gameState = "play";
        }
    }

    fill("red");
    stroke("red");
    text("Enemies Faced: " + score, 20, 10)

}

function enemies() {
    enemy = createSprite(850, 225, 10, 10)
    enemy.velocityX = -4;
    enemy.setCollider("circle", 0, 20, 100);
    enemy.addAnimation("en", enemyImg);
    enemy.scale = 0.35;
    enemyG.add(enemy);
    enemy.lifetime = 250;
}