import type { Game } from "./types";
import { createBoard } from "./types";
import { archerCard, soldierCard } from "./cards";

export function newGame(): Game {
  return {
    board: createBoard(),
    deck: [
      soldierCard(),
      archerCard(),
      soldierCard(),
      archerCard(),
      soldierCard(),
      archerCard(),
      soldierCard(),
      archerCard(),
    ],
    hand: [soldierCard(), archerCard()],
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
  };
}
