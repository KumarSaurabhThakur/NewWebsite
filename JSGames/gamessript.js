"use strict";

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.background = "aqua";

canvas.style.backgroundImage = "url('sky.jpg')";
canvas.style.backgroundSize = "cover";

const context = canvas.getContext("2d");

let offset = 0;

let hillset = 0;

//PLAYER CREATION
let gravity = 0.8;

class player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.position.width = 40;
        this.position.height = 40;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
    }

    playerMovement() {
        if ((this.position.height + this.position.y + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
        //this.position.y += this.velocity.y;

        //Collision Detection
        for (let i = 0; i < platformsArray.length; i++) {

            if (((this.position.x + this.position.width) >= platformsArray[i].position.x)
                && (this.position.x <= (platformsArray[i].position.x + platformsArray[i].width))
                && ((this.position.y + this.position.height+this.velocity.y) >= platformsArray[i].position.y)
                && (this.position.y <= (platformsArray[i].position.y))) {
                this.velocity.y = 0;

            }


            /*if ((this.position.x >= platformFigure2.position.x)
                && (this.position.x <= (platformFigure2.position.x + platformFigure2.width))
                && ((this.position.y + 40) >= platformFigure2.position.y)
                && (this.position.y <= (platformFigure2.position.y))) {
                this.velocity.y = 0;
    
            }*/

        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}


//PLAYER MOVEMENT
addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        playerFigure.velocity.x = 5;
        if (playerFigure.position.x + playerFigure.position.width > 400) {
            moveOffset(-5);
            moveHills(-5);
        }
    }

    else if (e.key === "ArrowUp") {
        playerFigure.velocity.y = -25;
        //splayerFigure.position.y-=8;
                // if (
        // \playerFigure.position.y + playerFigure.position.height > canvas.height - 5) {
        //     playerFigure.velocity.y = -25;
        // }
        // if (playerFigure.position.y + playerFigure.position.height < platformFigure.height +5) {
        //     playerFigure.velocity.y = -25;
        // }
    }

    else if (e.key === "ArrowLeft") {
        if (playerFigure.position.x > 0) {
            playerFigure.velocity.x = -5;
        }
        if (playerFigure.position.x + playerFigure.position.width > 400) {
            moveOffset(5);
            moveHills(5);
        }
    }
});

addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        playerFigure.velocity.x = 0;
    }

    else if (e.key === "ArrowLeft") {
        playerFigure.velocity.x = 0;
    }
})

//PLATFORMS CREATION
class platform {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y, width: width, height: height };
        this.width = width;
        this.height = height;
    }

    draw() {
        let platforms = new Image();
        platforms.src = "platform.png";
        context.drawImage(platforms, this.position.x, this.position.y, this.width, this.height);
    }

}

//HILLSclass hills {
class hillsImages {
    constructor() {
        this.position = { x: 0, y: 100 };
    }
    hillsDraw() {
        let hills = new Image();
        hills.src = "hills.png";
        context.drawImage(hills, this.position.x, this.position.y);

    }

}

let hillsArray = [];
const hillsFigure = new hillsImages();
hillsArray.push(hillsFigure);

let platformsArray = [];
const platformFigure = new platform(0, 500, 800, 200);
const platformFigure2 = new platform(platformFigure.width - 1, 500, 800, 200);
const platformFigure3 = new platform(platformFigure.width * 2 - 2, 300, 800, 200);

platformsArray.push(platformFigure);
platformsArray.push(platformFigure2);
platformsArray.push(platformFigure3);

const playerFigure = new player();
playerFigure.draw();
//GAME ANIMATION
function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);

    /*platformFigure.draw();
    platformFigure2.draw();*/

    for (let i = 0; i < hillsArray.length; i++) {
        hillsArray[i].hillsDraw();
    }

    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].draw();
    }
    playerFigure.playerMovement();
    playerFigure.draw();

}

function moveOffset(x) {
    offset += x;
    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].position.x += x;
    }
}

function moveHills(a) {
    hillset += a;
    for (let i = 0; i < hillsArray.length; i++) {
        hillsArray[i].position.x += a;
    }
}

moveOffset(-5);
moveHills(-5);

gameAnimation();