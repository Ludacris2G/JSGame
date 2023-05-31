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
let gameFrame3 = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemies/enemy1.png';
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height);
        this.frame = 0;
        this.flapSpeet = Math.floor(Math.random() * 3 + 1);
    }
    update() {
        this.x += Math.random() * 3 - 1.5;
        this.y += Math.random() * 3 - 1.5;
        if (gameFrame3 % this.flapSpeet === 0) {
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
    gameFrame3++;
    requestAnimationFrame(animate3);
}
// animate3();

/** @type {HTMLCanvasElement} */
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
const CANVAS_WIDTH4 = canvas4.width = 500;
const CANVAS_HEIGHT4 = canvas4.height = 1000;
const numberOfEnemies4 = 100;
const enemiesArray4 = [];
let gameFrame4 = 0;

class Enemy2 {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemies/enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas4.width - this.width);
        this.y = Math.random() * (canvas4.height - this.height);
        this.frame = 0;
        this.flapSpeet = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * .2;
        this.curve = Math.random() * 7;
    }
    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas4.width;
        if (gameFrame4 % this.flapSpeet === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx4.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies4; i++) {
    enemiesArray4.push(new Enemy2());
}

function animate4() {
    ctx4.clearRect(0, 0, CANVAS_WIDTH4, CANVAS_HEIGHT4);
    enemiesArray4.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame4++;
    requestAnimationFrame(animate4);
}
// animate4();


/** @type {HTMLCanvasElement} */
const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas5.getContext('2d');
const CANVAS_WIDTH5 = canvas5.width = 500;
const CANVAS_HEIGHT5 = canvas5.height = 1000;
const numberOfEnemies5 = 100;
const enemiesArray5 = [];
let gameFrame5 = 0;

class Enemy3 {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemies/enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = Math.random() * (canvas5.width - this.width);
        this.y = Math.random() * (canvas5.height - this.height);
        this.frame = 0;
        this.flapSpeet = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 1.5;
        this.curve = Math.random() * 200 + 50;
    }
    update() {
        this.x = canvas5.width/2 * Math.sin(this.angle * Math.PI/180) + canvas5.width/2 - this.width/2;
        this.y = canvas5.height/2 * Math.cos(this.angle * Math.PI/360) + (canvas5.height/2 - this.height/2);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas5.width;
        if (gameFrame5 % this.flapSpeet === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx5.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

for (let i = 0; i < numberOfEnemies5; i++) {
    enemiesArray5.push(new Enemy3());
}

function animate5() {
    ctx5.clearRect(0, 0, CANVAS_WIDTH5, CANVAS_HEIGHT5);
    enemiesArray5.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame5++;
    requestAnimationFrame(animate5);
}
// animate5();

/** @type {HTMLCanvasElement} */
const canvas6 = document.getElementById('canvas6');
const ctx6 = canvas6.getContext('2d');
const CANVAS_WIDTH6 = canvas6.width = 500;
const CANVAS_HEIGHT6 = canvas6.height = 1000;
const numberOfEnemies6 = 20;
const enemiesArray6 = [];
let gameFrame6 = 0;

class Enemy6 {
    constructor() {
        this.image = new Image();
        this.image.src = './images/enemies/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 230;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * (canvas6.width - this.width);
        this.y = Math.random() * (canvas6.height - this.height);
        this.newX = Math.random() * (canvas6.width - this.width);
        this.newY = Math.random() * (canvas6.height - this.height);
        this.frame = 0;
        this.flapSpeed = 5;
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        if (gameFrame6 % this.interval === 0) {
            this.newX = Math.random() * (canvas6.width - this.width);
            this.newY = Math.random() * (canvas6.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/90;
        if (gameFrame6 % this.flapSpeed === 0) {
            this.frame > 7 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx6.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.height, this.width)

    }
}

for (let i = 0; i <= numberOfEnemies6; i++) {
    enemiesArray6.push(new Enemy6());
}

function animate6() {
    ctx6.clearRect(0, 0, CANVAS_WIDTH6, CANVAS_HEIGHT6);
    enemiesArray6.forEach(enemy => {
        enemy.update()
        enemy.draw()
    })
    gameFrame6++;
    requestAnimationFrame(animate6);
}
// animate6();

const rect1 = { x: 5, y: 5, width: 50, height: 50 };
const rect2 = { x: 20, y: 10, width: 10, height: 10 };

if (rect1.x > rect2.x + rect2.width || 
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y
) {

} else {

}

const circle1 = { x: 10, y: 10, radius: 300 };
const circle2 = { x: 500, y: 500, radius: 150 };

let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;
let distance = Math.sqrt(dx * dx + dy * dy);
let sumOfRadii = circle1.radius + circle2.radius;

if (distance < sumOfRadii) {
    // collision
} else if (distance === sumOfRadii) {
    // touch
} else {
    // no collision
}

const canvas7 = document.getElementById('canvas7');
const ctx7 = canvas7.getContext('2d');
canvas7.width = 500;
canvas7.height = 700;
const explosions = [];
let canvasPosition = canvas7.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.image = new Image();
        this.image.src = './images/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.5;
        this.height = this.spriteHeight*0.5;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = './sounds/boom.wav';
    }
    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 15 === 0) {
            this.frame++;
        }
    }
    draw() {
        ctx7.save();
        ctx7.translate(this.x, this.y);
        ctx7.rotate(this.angle);
        ctx7.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 0 - this.width*0.5, 0 - this.height*0.5, this.width, this.height)
        // ctx7.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx7.restore();
    }
}
    
// window.addEventListener('click', function(e) {
//     createAnimation(e);
// })

// window.addEventListener('mousemove', (e) => {
//     createAnimation(e);
// })

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate7() {
    ctx7.clearRect(0, 0, canvas7.width, canvas7.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate7);
}
animate7();


window.addEventListener('load', () => {
    const canvas8 = document.getElementById('canvas8');
    const ctx8 = canvas8.getContext('2d');
    canvas8.width = 500;
    canvas8.height = 800;
    
    class Game8 {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 500;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider'];
        }
        update(deltaTime) {
            this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => enemy.update(deltaTime));
        }
        draw() {
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy === 'worm') this.enemies.push(new Worm(this));
            else if (randomEnemy === 'ghost') this.enemies.push(new Ghost(this));
            else if (randomEnemy === 'spider') this.enemies.push(new Spider(this));
        }
    }
    
    class Enemy8 {
        constructor(game) {
            this.game = game;
            this.markedForDeletion = false;
            this.frameX = 0;
            this.maxFrame = 5;
            this.frameInterval = 100;
            this.frameTimer = 0;
        }
        update(deltaTime) {
            this.x -= this.vX * deltaTime;
            if (this.x + this.width < 0) this.markedForDeletion = true;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) this.frameX++;
                else this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy8 {
        constructor(game) {
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth*0.5;
            this.height = this.spriteHeight*0.5;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            // ids will work automatically 0.o
            this.image = worm;
            this.frame = 0;
            this.vX = Math.random() * 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy8 {
        constructor(game) {
            super(game);
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth*0.5;
            this.height = this.spriteHeight*0.5;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height * 0.6;
            // ids will work automatically 0.o
            this.image = ghost;
            this.frame = 0;
            this.vX = Math.random() * 0.2 + 0.1;
            this.angle = Math.random() * 1;
            this.curve = Math.random() * 3;
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += Math.sin(this.angle) * this.curve;
            this.angle += 0.04;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = 0.7;
            super.draw(ctx);
            ctx.restore();
        }
    }

    class Spider extends Enemy8 {
        constructor(game) {
            super(game);
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth*0.5;
            this.height = this.spriteHeight*0.5;
            this.x = Math.random() * this.game.width;
            this.y = 0 - this.height;
            // ids will work automatically 0.o
            this.image = spider;
            this.frame = 0;
            this.vX = 0;
            this.vY = Math.random() * 0.1 + 0.1;
            this.maxLength = Math.random() * this.game.height - this.height;
        }
        update(deltaTime) {
            super.update(deltaTime);
            this.y += this.vY * deltaTime;
            if (this.y > this.maxLength) this.vY *= -1;
            if (this.y - this.height < 0) this.markedForDeletion = true;
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width*0.5, 0);
            ctx.lineTo(this.x + this.width*0.5, this.y + 10);
            ctx.stroke();
            super.draw(ctx);
        }
    }

    const game = new Game8(ctx8, canvas8.width, canvas8.height);
    let lastTime = 1;
    function animate8(timeStamp) {
        ctx8.clearRect(0, 0, canvas8.width, canvas8.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate8);
    }
    animate8(0);
});