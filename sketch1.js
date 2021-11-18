var play, playimg, sound, soundimg, nosound, nosoundimg, speaker, speakerimg, about, aboutimg, newhome, newhomeimg, home, homeing, newsound, newsoundimg, newnosound, newnosoundimg
var startbgimg, gamebgimg, endbg, reset, resetimg, score = 0
var diamond = 0
var diamondcount = "none"
var gameState = "wait"
var axe,axeimg,timer=0,counter=10

function preload() {

    myFont = loadFont('fonts/fontwrite.ttf')

    startbgimg = loadImage("waitimage.jpg")
    gamebgimg = loadImage("background2.gif")

    axeimg=loadImage("axe.gif")
    resetimg = loadImage("resume.png")
    playimg = loadImage("playwood.png")
    //cutimg = loadImage("woodcutterright.gif")
    homeimg = loadImage("home.png")
    soundimg = loadImage("yes.png")
    nosoundimg = loadImage("no.png")
    aboutimg = loadImage("info.png")
    logoimg = loadImage("logo1n.png")

    playerwalkimg = loadImage("playerwalk.gif")
    playerjumpimg = loadImage("playerhappy.gif")
    growplantimg = loadImage("tree1.gif")
    playerwalkleft = loadImage("playerwalkleft.gif")
    scorebox = loadImage("scorebutton1.png")
    diamonds = loadImage("diamond.jpg")
    backboardimg = loadImage("woodback.png")
    speakerimg = loadImage("gsound.png")

    winpopup=loadImage("backboard.png")

}


function setup() {
    createCanvas(windowWidth, windowHeight - 30)
    textFont(myFont);

    player = createSprite(100, windowHeight - 150)
    player.addImage(playerwalkimg)
    //  player.visible = false

    growplant = createSprite((player.x + 250), windowHeight - 200)
    growplant.addImage(growplantimg)
    growplant.scale = 0.01
    growplant.visible = false

    backboard = createSprite(windowWidth / 2 - 50, windowHeight / 2.7)
    backboard.visible = false

    home = createSprite((windowWidth / 2 - 50), (backboard.y - backboard.y / 1.2))
    home.addImage(homeimg)
    //home.scale = .6

    about = createSprite((windowWidth / 2 - 50), home.y + 100)
    about.addImage(aboutimg)
    //about.scale = 0.75


    play = createSprite((windowWidth / 2 - 50), backboard.y)
    play.addImage(playimg)
    //play.scale = 1.5




    reset = createSprite(windowWidth / 2 - 50, windowHeight / 1.5)
    reset.addImage(resetimg)
    //reset.scale = .75
    reset.visible = false

    sound = createSprite(backboard.x - 100, play.y + 175)
    sound.addImage(soundimg)
    //sound.scale = .7

    nosound = createSprite(backboard.x + 100, play.y + 175)
    nosound.addImage(nosoundimg)
    //nosound.scale = 0.6

    speaker = createSprite(backboard.x, sound.y - 80)
    speaker.addImage(speakerimg)
    speaker.scale = .7



    newhome = createSprite(windowWidth / 2, 50)
    newhome.addImage(homeimg)
    newhome.visible = false






    axeGroup = new Group()
    player.debug = true
    player.setCollider("circle", 0, 0, 80)


    box2 = createSprite((windowWidth - 300), 90, 200, 50)
    box2.addImage(scorebox)
    // box2.scale = .
    box2.visible = false

    box1 = createSprite(300, 90, 200, 50)
    box1.addImage(scorebox)
    //  box1.scale = .9
    box1.visible = false


    plantGroup = new Group()





}

function draw() {

    if (gameState === "wait") {
        background(startbgimg)
        backboard.visible = true
        backboard.addImage(backboardimg)
        backboard.scale = 1.2
        home.visible = true
        play.visible = true
        speaker.visible = true
        sound.visible = true
        nosound.visible = true
        about.visible = true
        backboard.scale = 1.23
        axeGroup.destroyEach()

        reset.visible=false
        box1.visible = false
        box2.visible = false
        newhome.visible = false
        player.visible = false
        score=0
counter=10

    }



    //buttons functionalities

    if (mousePressedOver(play)) {
        background(gamebgimg)

        gameState = "play"

    }

    if (mousePressedOver(home)) {

        gameState = "wait"
    }


    if (mousePressedOver(about)) {
        gameState = "about"
        axeGroup.destroyEach()

    }

if(mousePressedOver(reset)){
    gameState="wait"
}

    // various gamestates

    if (gameState === "play") {
        background(gamebgimg)
        backboard.visible = false
        home.visible = false
        play.visible = false
        speaker.visible = false
        sound.visible = false
        nosound.visible = false
        about.visible = false
        player.visible = true
        reset.visible=false

        newhome.visible = true
        box1.visible = true
        box2.visible = true

        spawnaxe()
// touching of axe and plant
for (var i = 0; i < axeGroup.length; i++) {

    for(var a = 0; a < plantGroup.length; a++){
    if (axeGroup.get(i).isTouching(plantGroup.get(a))) {
        axeGroup.get(i).destroy();
        plantGroup.get(a).destroy()

       score = score -1;

    }}
    }


        //player movement


        if (keyDown("Right_Arrow")) {
            player.x = player.x + 5
            player.addImage(playerwalkimg)
        }


        if (keyDown("Left_Arrow")) {
            player.x = player.x - 5
            player.addImage(playerwalkleft)
        }


        if (player.x > windowWidth) {
            player.x = 10
        }

        if (player.x < 0) {
            player.x = windowWidth - 10
        }

        if(score>=10 ){
            if(counter >= 0){
            
            gameState = "win"
           // background("yellow")

        }
            else{
                gameState="end"
         //       background("pink")
       }
          
          
        }

        else if(counter<=0 && gameState==="play"){
            if(score>=10){
                gameState="win"
            }
            else{
                gameState="end"
            }
        }

        //diamonds calculations

      /*  if (score !== 0 && score % 10 === 0) {
            diamond = 1

        }

        if (score !== 0 && score % 20 === 0) {
            diamond = 2
        }

        if (score !== 0 && score % 30 === 0) {
            diamond = 3
        }

        if (score !== 0 && score % 40 === 0) {
            diamond = 4
        }

        if (score !== 0 && score % 50 === 0) {
            diamond = 5
        }*/


        /*if (score >= 10) {
            background(0)

            gameState = "win"
            growplant.visible = false


        }*/
       

    }

    if (gameState === "win") {
        background("yellow")

        plantGroup.destroyEach()
        player.destroy()
        backboard.visible = true
        backboard.addImage(winpopup)
        backboard.scale = 1.5
axeGroup.destroyEach()

        newhome.visible = false
        box1.visible = false
        box2.visible = false
        reset.visible = true
score=0
counter=10

    }

    
    if(gameState==="end"){

     //   background("pink")
     backboard.visible = true
     backboard.addImage(winpopup)
     backboard.scale = 1.5
        reset.visible=true
        axeGroup.destroyEach()
        player.visible=false
        plantGroup.destroyEach()
        score=0
        counter=10
        box1.visible=false
        box2.visible=false
        score=0

        
    }

    if (gameState === "about") {

        background(startbgimg)
        backboard.visible = true
        backboard.scale = 1.5
        home.visible = true
        play.visible = false
        speaker.visible = false
        sound.visible = false
        nosound.visible = false
        about.visible = false
        player.visible = false


    }


    drawSprites()

    // print score and diamond
    if (gameState === "play") {
        count()
        textSize(20)
        stroke(4)
        fill("black")
        text("Trees Planted:" + score, 212, 95)

       // image(diamonds, box2.x - (box2.width / 4), 55, 60, 60)
        text(" Timer: " + counter,  box2.x -75, 95)
    }

if(gameState==="about"){
    textSize(20)
    fill("green")
    text("We are killing our environment by cutting trees",windowWidth/2-backboard.width/2,120)
    text("This Game is about planting trees and saving ",windowWidth/2-backboard.width/2,150)
    text("yourself from the randomly falling axes",windowWidth/2-backboard.width/2,180)

}


if(gameState ==="win"){
    textSize(20)
    fill("green")
    text("You Win",windowWidth/2-backboard.width/2,120)
    text("This Game is about planting trees and saving ",windowWidth/2-backboard.width/2,150)
    text("yourself from the randomly falling axes",windowWidth/2-backboard.width/2,180)

}

}

function keyPressed() {
    if (keyCode === 32 && gameState==="play") {
        growplant = createSprite((player.x + 250), windowHeight - 200)
        growplant.addImage(growplantimg)
        plantGroup.add(growplant)
        score += 1

    }

    player.x = player.x + 150

}



function spawnaxe() {
    if (frameCount % 30 == 0) {
        axe = createSprite(Math.round(random(100, windowWidth - 100)), 10)
        //  axe.x=Math.round(random(100,windowWidth-100))
        //axe.y=10

        axe.velocityY = 2
        axe.velocityX = 1
        axe.addImage(axeimg)
        axeGroup.add(axe)
        axe.debug = true
        axe.setCollider("circle", 0,-60, 40)
    }



}


    function count(){
        if(frameCount%30 === 0){
            counter=counter-1
        }
    }