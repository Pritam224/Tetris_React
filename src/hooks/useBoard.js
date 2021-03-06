import React, { useState, useEffect } from "react";
import { createShape } from "../BoardShape";
import { randTetrominos } from "../Tetrominos";

export const useBoard = (player, resetPlayer) => {
  const [board, setBoard] = useState(createShape());
  const [clearedRows, setClearedRows] = useState(0);

  useEffect(() => {
    setClearedRows(0);

    const sweepRows = (newBoard) => {
      return newBoard.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setClearedRows((prev) => prev + 1);
          acc.unshift(
            new Array(newBoard[0].length).fill([0, "clear", "0,0,0"])
          );
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);
    };

    const updateBoard = (prevBoard) => {
      const newBoard = prevBoard.map((row) =>
        row.map((cell) => (cell[1] == "clear" ? [0, "clear", "0,0,0"] : cell))
      );

      //Draw tetromino
      player.tetramino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
              player.tetramino.color,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newBoard);
      }
      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [player, resetPlayer]);

  return [board, setBoard, clearedRows];
};
