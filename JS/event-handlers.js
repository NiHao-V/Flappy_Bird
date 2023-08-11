function handleMouseDown(e) {
    switch (gameState.current) {
        case gameState.getReady:
            gameState.current = gameState.game;
            SWOOSHING.play();
            break;
        case gameState.game:
            bird.flap();
            FLAP.play();
            break;
        case gameState.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let clickY = e.clientY - rect.top;
            if (
                clickX >= startBtn.x &&
                clickX <= startBtn.x + startBtn.w &&
                clickY >= startBtn.y &&
                clickY <= startBtn.y + startBtn.h
            ) {
                resetGame();
            }
            break;
    }
}