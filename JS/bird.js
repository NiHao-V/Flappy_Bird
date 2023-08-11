class BirdPhysics {
    constructor() {
        this.x = 50;
        this.y = 150;
        this.speed = 0;
        this.gravity = 0.07;
        this.jump = 2.1;
        this.rotation = 0;
        this.frame = 0;
        this.period = gameState.current == gameState.getReady ? 10 : 5;
    }

    flap() {
        this.speed = -this.jump;
    }

    update() {
        this.period = gameState.current == gameState.getReady ? 10 : 5;
        this.frame += frame % this.period == 0 ? 1 : 0;
        this.frame = this.frame % 3;

        if (gameState.current == gameState.getReady) {
            this.y = 150;
            this.rotation = 0 * DEGREE;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if (this.y + 13 >= cvs.height - fg.h) {
                this.y = cvs.height - fg.h - 13;
                if (gameState.current == gameState.game) {
                    gameState.current = gameState.over;
                    DIE.play();
                }
            }

            if (this.y - 13 < 0) {
                this.y = 13;
                this.speed = 0;
            }

            if (this.speed >= this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else if (this.speed >= this.jump / 2) {
                this.rotation = 45 * DEGREE;
            } else {
                this.rotation = 0;
            }
        }
    }

    speedReset() {
        this.speed = 0;
    }
}

class Bird {
    constructor() {
        this.animation = [
            { sX: 276, sY: 112 },
            { sX: 276, sY: 139 },
            { sX: 276, sY: 164 },
        ];
        this.w = 34;
        this.h = 26;
        this.radius = 12;
        this.physics = new BirdPhysics();
    }

    draw() {
        let bird = this.animation[this.physics.frame];
        ctx.save();
        ctx.translate(this.physics.x, this.physics.y);
        ctx.rotate(this.physics.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, -this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();

        if (gameState.current === gameState.getReady) {
            getReady.draw();
        } else if (gameState.current === gameState.over) {
            gameOver.draw();
        }
    }

    flap() {
        this.physics.flap();
    }

    update() {
        this.physics.update();
    }

    speedReset() {
        this.physics.speedReset();
    }

    reset() {
        this.physics.y = 150;
        this.physics.speed = 0;
        this.physics.frame = 0;
        gameState.current = gameState.getReady;
    }
}