export const checkCollision = (player, board, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetramino.length; y += 1) {
    console.log("call");
    for (let x = 0; x < player.tetramino[y].length; x += 1) {
      if (player.tetramino[y][x] !== 0) {
        if (
          !board[y + player.pos.y + moveY] ||
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
};