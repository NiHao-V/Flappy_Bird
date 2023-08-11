class Background {
    constructor(sX, sY, sW, sH, x, y, w, h, dx) {
        this.sX = sX;
        this.sY = sY;
        this.sW = sW - 12; // ширина фона
        this.sH = sH; // высота фона
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = dx;
        this.offset = 0;
    }

    increaseSize() {
        this.w += 20;
        this.h = (this.w * this.sH) / this.sW; // Пропорционально изменить высоту фона
    }



    draw() {
        for (let i = 0; i <= Math.ceil(cvs.width / this.sW); i++) {
            ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.x + i * this.sW - this.offset, this.y, this.sW, this.sH);
        }
    }
    

    update() {
        if (gameState.current == gameState.game) {
            this.offset += this.dx;
            if (this.offset >= this.sW) {
                this.offset = 0;
            }
        }
    }
}