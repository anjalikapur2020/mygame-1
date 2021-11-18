var background, player, tree, woodcutter
var play, home, sound, nosound, about, bgstart, newsound, newnosound
var playimg, homeimg, soundimg, nosoundimg, aboutimg, bgstartimg
var gamestate = "wait"
var player, playerwalkimg, playerjumpimg, growplantimg, plant, cut, cutimg
var woodcutter, playerwalkleft
var score = 0
var diamond = 0
var tree, box1, box2

function preload() {
    bgimg = loadImage("background2.gif")
    bgimg2 = loadImage("gameend.jpg")
    woodcutterimg = loadImage("woodcutterleft.gif")

    resetimg = loadImage("greset.png")
    playimg = loadImage("playwood.png")
    cutimg = loadImage("woodcutterright.gif")
    homeimg = loadImage("home.png")
    soundimg = loadImage("yes.png")
    nosoundimg = loadImage("no.png")
    aboutimg = loadImage("info.png")
    logoimg = loadImage("logo1n.png")
    bgstartimg = loadImage("waitimage.jpg")
    playerwalkimg = loadImage("playerwalk.gif")
    playerjumpimg = loadImage("playerhappy.gif")
    growplantimg = loadImage("tree2.gif")
    playerwalkleft = loadImage("playerwalkleft.gif")
    scorebox = loadImage("scorebutton.png")
    diamonds = loadImage("diamond.jpg")
    backboardimg=loadImage("woodback.png")
    speakerimg=loadImage("gsound.png")


}

function setup() {
    createCanvas(windowWidth, windowHeight - 30)


    /*  woodcutter = createSprite(windowWidth - 200, windowHeight - 200, 50, 50)
      woodcutter.addImage(woodcutterimg)
      woodcutter.scale = 0.8*/

    cut = createSprite(windowWidth / 2 - 15, windowHeight - 150)
    cut.addImage(cutimg)
    cut.scale = 1.25

    logo = createSprite(windowWidth / 2, windowHeight / 2)
    logo.addImage(logoimg)

     backboard = createSprite(windowWidth / 2-50,windowHeight/2.7)
     backboard.addImage(backboardimg)
     backboard.scale=1.2
     backboard.visible=false

    home = createSprite((windowWidth / 2 - 50), (backboard.y-backboard.y/1.2))
    home.addImage(homeimg)
    //home.scale = .6

    about = createSprite((windowWidth / 2 - 50), home.y+100)
     about.addImage(aboutimg)
     //about.scale = 0.75

     
     play = createSprite((windowWidth / 2 - 50), backboard.y)
     play.addImage(playimg)
     //play.scale = 1.5

     


    reset = createSprite(windowWidth / 2, windowHeight / 2)
    reset.addImage(resetimg)
    reset.scale = .75
    reset.visible = false

    sound = createSprite(backboard.x-100, play.y+175)
    sound.addImage(soundimg)
    //sound.scale = .7

    nosound = createSprite(backboard.x +100, play.y+175)
    nosound.addImage(nosoundimg)
    //nosound.scale = 0.6

    speaker=createSprite(backboard.x,sound.y-80)
speaker.addImage(speakerimg)
speaker.scale=.7

    newsound = createSprite(100, 50)
    newsound.addImage(soundimg)
    newsound.scale = 0.4

    newnosound = createSprite(windowWidth - 100, 50)
    newnosound.addImage(nosoundimg)
    newnosound.scale = 0.35

    newhome = createSprite(windowWidth / 2, 100)
    newhome.addImage(homeimg)
    newhome.scale = 0.35

    newhome.visible = false
    newsound.visible = false
    newnosound.visible = false



    player = createSprite(100, windowHeight - 150)
    player.addImage(playerwalkimg)
    //  player.visible = false

    growplant = createSprite((player.x + 250), windowHeight - 270)
    growplant.addImage(growplantimg)
    growplant.scale = 0.01
    growplant.visible = false

    woodcutterGroup = new Group()
    player.debug = true
    player.setCollider("circle", 0, 0, 80)


    box2 = createSprite((windowWidth - 200), 90, 200, 50)
    box2.addImage(scorebox)
    box2.scale = 1.5
    box2.visible = false

    box1 = createSprite((windowWidth / 6), 90, 200, 50)
    box1.addImage(scorebox)
    box1.scale = 1.5
    box1.visible = false


    plantGroup = new Group()

}


function draw() {




    if (gamestate === "wait") {
        background(bgstartimg)
        // woodcutter.visible = false
        play.visible = true
        about.visible = true
        sound.visible = true
        nosound.visible = true
        logo.visible = false
        cut.visible = false
        player.visible = false
        box2.visible = false
        box1.visible = false
        growplant.visible = false
        woodcutterGroup.destroyEach()
        score = 0
        diamond = 0
        backboard.visible=true



    }

    //play button functionality
    if (mousePressedOver(play)) {
        gamestate = "playgame"
        player.visible = true
        cut.visible = false


    }


    //about button functionality
    if (mousePressedOver(about)) {
        gamestate = "about"
        growplant.visible = false
        plantGroup.destroyEach()
        backboard.visible=false

    }


    //home button functionality
    if (mousePressedOver(home)) {
        gamestate = "wait"
        sound.visible = false
        nosound.visible = false
        logo.visible = false

        growplant.visible = false
        plantGroup.destroyEach()
        score = 0
        diamond = 0

    }

    if (mousePressedOver(reset) && gamestate === "end") {
        gamestate = "wait"
        reset.visible = false
        diamond = 0
        score = 0


    }



    //newhome button functionality
    if (mousePressedOver(newhome)) {
        gamestate = "wait"
        logo.visible = false
        plantGroup.destroyEach()
        score = 0
        diamond = 0

    }


    if (gamestate === "playgame") {

        background(bgimg)

        if (score > 0 && (score % 10 === 0)) {
            diamond = diamond + 1
        }

        if (diamond >= 2) {
            gamestate = "end"
            //  background(bgimg2)
            reset.visible = true
            box1.visible = false
            box2.visible = false
            newsound.visible = false
            newnosound.visible = false
            newhome.visible = false
        }

        play.visible = false
        //play.destroy()
        logo.visible = false
        //about.destroy()
        about.visible = false
        sound.visible = false
        home.visible = false
        nosound.visible = false
        // woodcutter.visible = true
        spawanWoodcutter()
        newsound.visible = true
        newnosound.visible = true
        newhome.visible = true
        backboard.visible=false

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
        if (player.isTouching(woodcutterGroup)) {
            //woodcutter.visible = false
            player.addImage(playerjumpimg)

        }


    }

    if (gamestate === "wait") {



        play.visible = true
        about.visible = true
        sound.visible = true
        nosound.visible = true
        newsound.visible = false
        newnosound.visible = false
        home.visible = true
        newhome.visible = false
        logo.visible = false
        box2.visible = false
        box1.visible = false
        backboard.visible=true



    }

    if (gamestate === "about") {
        background("red")
        sound.visible = false
        nosound.visible = false
        play.visible = false
        about.visible = false
        home.visible = true
        box2.visible = false
        box1.visible = false
        backboard.visible=false


        /* if (mousePressedOver(home)) {
             gamestate = "wait"
         }*/
    }





    drawSprites()




    if (gamestate === "playgame") {
        textSize(25)
        fill("green")
        text("Plants : " + score, windowWidth / 8, 100)
        //text("Diamonds : "+diamond,(windowWidth- windowWidth/4),100)
        image(diamonds, (windowWidth - 250), 60, 60, 60)
        text(" : " + diamond, windowWidth - 200, 100)
 

        box2.visible = true
        box1.visible = true

    }


    if (gamestate === "end") {
        textSize(50)
        fill("red")
        text("CONGRATULATIONS!!! YOU HAVE DONE IT !!!", 100, windowHeight / 2 + 100)



        reset.visible = true
        woodcutterGroup.destroyEach()
        plantGroup.destroyEach()


    }
}


function spawanWoodcutter() {
    if (frameCount % 250 == 0) {
        woodcutter = createSprite(Math.round(random(100, windowWidth - 100)), 10)
        //  woodcutter.x=Math.round(random(100,windowWidth-100))
        //woodcutter.y=10

        woodcutter.velocityY = 2
        woodcutter.velocityX = 1
        woodcutter.addImage(woodcutterimg)
        woodcutterGroup.add(woodcutter)
        woodcutter.debug = true
        woodcutter.setCollider("circle", 0, 0, 80)
    }



}

function keyPressed() {
    if (keyCode === 32) {
        //growplant.visible = true
        // growplant.velocityX = 1
        growplant = createSprite((player.x + 250), windowHeight - 270)
        growplant.addImage(growplantimg)
        //growplant.scale = 0.75

        plantGroup.add(growplant)

        score += 1

    }

    player.x = player.x + 150

}