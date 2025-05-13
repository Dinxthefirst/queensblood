import type { Game, Card } from "./types";
import { createBoard } from "./types";

export function newGame(deck: Card[]): Game {
  const hand: Card[] = [];
  for (let i = 0; i < 3; i++) {
    hand.push(deck.pop()!);
  }

  return {
    board: createBoard(),
    deck: deck,
    hand: hand,
    currentTurn: 0,
    playCard(cardId: number, row: number, col: number) {
      const card = this.hand.find((c) => c.id === cardId);

      if (card) {
        if (this.board[row][col].value < card.cost) {
          console.error("Not enough resources to play this card.");
          return;
        }
        card.play(this, row, col);
        this.hand = this.hand.filter((c) => c.id !== cardId);
        this.board[row][col].card = card;
        const drawCard = () => {
          if (this.deck.length > 0) {
            const drawnCard = this.deck.pop();
            if (drawnCard) {
              this.hand.push(drawnCard);
            }
          } else {
            console.log("No more cards in the deck.");
          }
        };
        drawCard();
      }
    },
    drawCard() {
      if (this.deck.length > 0) {
        const drawnCard = this.deck.pop();
        if (drawnCard) {
          this.hand.push(drawnCard);
        }
      } else {
        console.log("No more cards in the deck.");
      }
    },
    endTurn() {
      this.currentTurn = (this.currentTurn + 1) % 2;
      this.drawCard();
    },
  };
}
