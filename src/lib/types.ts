export type Cell = {
  value: number;
  card?: Card;
};

export type Board = Cell[][];

export type Card = {
  id: number;
  name: string;
  cost: number;
  value: number;
  description: string;
  play: (game: Game, row: number, col: number) => void;
};

export function createBoard(): Board {
  const board: Board = [];
  for (let row = 0; row < 3; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < 5; col++) {
      if (col === 0) {
        rowCells.push({ value: 1 });
      } else if (col === 4) {
        rowCells.push({ value: -1 });
      } else {
        rowCells.push({ value: 0 });
      }
    }
    board.push(rowCells);
  }
  return board;
}

export type Game = {
  board: Board;
  deck: Card[];
  hand: Card[];
  playCard: (cardId: number, row: number, col: number) => void;
};
