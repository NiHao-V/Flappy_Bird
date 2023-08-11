class Score {
    constructor() {
        this.best = parseInt(localStorage.getItem("best")) || 0;
        this.value = 0;
    }

    draw() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (gameState.current == gameState.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            const scoreText = this.value.toString();
            const textWidth = ctx.measureText(scoreText).width;
            const yOffset = 35; // счетчик очков
            ctx.fillText(scoreText, cvs.width / 2 - textWidth / 2, cvs.height - yOffset);
            ctx.strokeText(scoreText, cvs.width / 2 - textWidth / 2, cvs.height - yOffset);
        } else if (gameState.current == gameState.over) {
            ctx.font = "25px Teko";
            const scoreText = this.value.toString();
            const bestText = this.best.toString();
            const scoreTextWidth = ctx.measureText(scoreText).width;
            const bestTextWidth = ctx.measureText(bestText).width;
            ctx.fillText(scoreText, cvs.width / 2 - scoreTextWidth / 2, 166);
            ctx.strokeText(scoreText, cvs.width / 2 - scoreTextWidth / 2, 166);
            ctx.fillText(bestText, cvs.width / 2 - bestTextWidth / 2, 208);
            ctx.strokeText(bestText, cvs.width / 2 - bestTextWidth / 2, 208);
        }
    }

    reset() {
        this.value = 0;
    }
}