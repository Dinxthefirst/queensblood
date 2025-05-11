import type { Card } from "./types";

const directions = {
  left: { rowOffset: 0, colOffset: -1 }, // Left
  right: { rowOffset: 0, colOffset: 1 }, // Right
  up: { rowOffset: -1, colOffset: 0 }, // Up
  down: { rowOffset: 1, colOffset: 0 }, // Down
  upLeft: { rowOffset: -1, colOffset: -1 }, // Up-Left
  upRight: { rowOffset: -1, colOffset: 1 }, // Up-Right
  downLeft: { rowOffset: 1, colOffset: -1 }, // Down-Left
  downRight: { rowOffset: 1, colOffset: 1 }, // Down-Right
};

const isWithinBounds = (row: number, col: number) => {
  return row >= 0 && row < 3 && col >= 0 && col < 5;
};

export const soldierCard: Card = {
  id: 1,
  name: "Soldier",
  cost: 1,
  value: 1,
  description: "A basic soldier card.",
  play: (game, row, col) => {
    [directions.up, directions.right, directions.down].forEach(
      ({ rowOffset, colOffset }) => {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;

        if (
          isWithinBounds(newRow, newCol) &&
          !game.board[newRow][newCol].card
        ) {
          game.board[newRow][newCol].value += 1;
        }
      }
    );
  },
};
