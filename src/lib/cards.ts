import type { Card, Direction, Game } from "./types";

const up: Direction = [-1, 0];
const down: Direction = [1, 0];
const left: Direction = [0, -1];
const right: Direction = [0, 1];
const upLeft: Direction = [-1, -1];
const upRight: Direction = [-1, 1];
const downLeft: Direction = [1, -1];
const downRight: Direction = [1, 1];
const topleft: Direction = [-2, -2];
const topright: Direction = [-2, 2];
const bottomleft: Direction = [2, -2];
const bottomright: Direction = [2, 2];
const upup: Direction = [-2, 0];
const downDown: Direction = [2, 0];
const leftLeft: Direction = [0, -2];
const rightRight: Direction = [0, 2];
const upRightRight: Direction = [-1, 2];
const downRightRight: Direction = [1, 2];

const uniqueId = (() => {
  let id = 0;
  return () => id++;
})();

const isWithinBounds = (row: number, col: number) => {
  return row >= 0 && row < 3 && col >= 0 && col < 5;
};

function attack(
  game: Game,
  row: number,
  col: number,
  rowOffset: number,
  colOffset: number,
  attackPower: number
) {
  const newRow = row + rowOffset;
  const newCol = col + colOffset;

  if (!isWithinBounds(newRow, newCol)) return;

  const cell = game.board[newRow][newCol];
  if (cell.card) return;

  if (cell.value < 0) {
    cell.value *= -1;
  } else {
    cell.value += attackPower;
    cell.value = Math.min(cell.value, 3);
  }
}

function createCard({
  name,
  cost,
  value,
  description,
  attacks,
  play,
}: {
  name: string;
  cost: number;
  value: number;
  description: string;
  attacks: [Direction, number][];
  play: (game: Game, row: number, col: number) => void;
}): Card {
  return {
    id: uniqueId(),
    name,
    cost,
    value,
    description,
    attacks,
    play,
  };
}

const soldierCard = () => {
  let attacks: [Direction, number][] = [
    [up, 1],
    [down, 1],
    [right, 1],
  ];
  return createCard({
    name: "Soldier",
    cost: 1,
    value: 1,
    description: "A basic soldier card.",
    attacks: attacks,
    play: (game, row, col) => {
      attacks.forEach(([[rowOffset, colOffset], attackPower]) => {
        attack(game, row, col, rowOffset, colOffset, attackPower);
      });
    },
  });
};

const rangerCard = () => {
  let attacks: [Direction, number][] = [
    [right, 1],
    [rightRight, 2],
  ];
  return createCard({
    name: "Ranger",
    cost: 2,
    value: 2,
    description: "A ranged unit that can attack from a distance.",
    attacks: attacks,
    play: (game, row, col) => {
      attacks.forEach(([[rowOffset, colOffset], attackPower]) => {
        attack(game, row, col, rowOffset, colOffset, attackPower);
      });
    },
  });
};

const flankerCard = () => {
  let attacks: [Direction, number][] = [
    [topright, 1],
    [bottomright, 1],
  ];
  return createCard({
    name: "Flanker",
    cost: 1,
    value: 2,
    description: "A unit that can attack from the the other side of the board.",
    attacks: attacks,
    play: (game, row, col) => {
      attacks.forEach(([[rowOffset, colOffset], attackPower]) => {
        attack(game, row, col, rowOffset, colOffset, attackPower);
      });
    },
  });
};

const cannonCard = () => {
  let attacks: [Direction, number][] = [
    [right, 1],
    [upRight, 1],
    [downRight, 1],
    [rightRight, 1],
    [upRightRight, 1],
    [downRightRight, 1],
  ];
  return createCard({
    name: "Cannon",
    cost: 3,
    value: 3,
    description: "A unit that can hits everything in its path.",
    attacks: attacks,
    play: (game, row, col) => {
      attacks.forEach(([[rowOffset, colOffset], attackPower]) => {
        attack(game, row, col, rowOffset, colOffset, attackPower);
      });
    },
  });
};

export const cards = [
  { name: "Soldier", createCard: soldierCard },
  { name: "Ranger", createCard: rangerCard },
  { name: "Flanker", createCard: flankerCard },
  { name: "Cannon", createCard: cannonCard },
];
