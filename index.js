// canvas 1 ->
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const CANVAS_WIDTH = canvas1.width = 600;
const CANVAS_HEIGHT = canvas1.height = 600;

const playerImage = new Image();
playerImage.src = './images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, i) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++) {
        let positionX = spriteWidth * j;
        let positionY = spriteHeight * i; 
        frames.loc.push({ x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameFrame++;
    requestAnimationFrame(animate);
};
// animate();

// canvas 2 ->
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const CANVAS_WIDTH2 = canvas2.width = 800;
const CANVAS_HEIGHT2 = canvas2.height = 700;
let gameSpeed = 1;
let gameFrame2 = 0;
const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener('change', function(e) {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
})

const backgroundLayer1 = new Image();
backgroundLayer1.src = './images/backgroundLayers/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './images/backgroundLayers/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './images/backgroundLayers/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './images/backgroundLayers/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './images/backgroundLayers/layer-5.png';

window.addEventListener('load', function() {
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            this.x = gameFrame2 * this.speed % this.width;
        }
        draw() {
            ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx2.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, .2);
    const layer2 = new Layer(backgroundLayer2, .4);
    const layer3 = new Layer(backgroundLayer3, .6);
    const layer4 = new Layer(backgroundLayer4, .8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];
    
    function animate2() {
        ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
        gameObjects.forEach(obj => {
            obj.update();
            obj.draw();
        })
        gameFrame2--;
        requestAnimationFrame(animate2);
    }
    // animate2();
})

/** @type {HTMLCanvasElement} */
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
const CANVAS_WIDTH3 = canvas3.width = 500;
const CANVAS_HEIGHT3 = canvas3.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];
const gameFrame3 = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemies/enemy1.png';
        this.x = Math.random() * canvas3.width;
        this.y = Math.random() * canvas3.height;
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.frame = 0;
        this.flapSpeet = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += this.speed;
        this.y += this.speed;
        if (gameFrame % this.flapSpeet === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx3.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate3() {
    ctx3.clearRect(0, 0, CANVAS_WIDTH3, CANVAS_HEIGHT3);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate3);
}
animate3();