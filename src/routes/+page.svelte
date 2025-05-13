<script lang="ts">
  import type { Card } from "$lib/types";
  import { cards } from "$lib/cards";
  import { newGame } from "$lib/game";
  import game from "$lib/gameStore";
  import { goto } from "$app/navigation";

  let cardAmounts = cards.reduce(
    (acc, { name }) => ({ ...acc, [name]: 0 }),
    {} as Record<string, number>
  );

  let cardInstances = cards.map(({ name, createCard }) => ({
    name,
    card: createCard(),
  }));

  function startNewGame() {
    const deck: Card[] = [];

    cards.forEach(({ name, createCard }) => {
      for (let i = 0; i < cardAmounts[name]; i++) {
        deck.push(createCard());
      }
    });

    if (deck.length != 10) {
      alert("Please select exactly 10 cards to start a new game.");
      return;
    }

    const shuffledDeck = deck.sort(() => Math.random() - 0.5);

    game.set(newGame(shuffledDeck));

    goto("/game");
  }
</script>

<menu>
  <div class="cards">
    {#each cardInstances as cardInstance}
      <div class="card-container">
        <div class="card">
          <div class="card-content">
            <cost>
              {"*".repeat(cardInstance.card.cost)}
            </cost>
            <value>
              {cardInstance.card.value}
            </value>
          </div>
          <div class="attack-grid">
            {#each Array(5) as _, rowIndex}
              {#each Array(5) as _, colIndex}
                <div
                  class="attack-cell
                  {rowIndex === 2 && colIndex === 2 ? 'center' : ''}
                  {cardInstance.card.attacks.some(
                    ([[rowOffset, colOffset], _]) =>
                      rowOffset + 2 === rowIndex && colOffset + 2 === colIndex
                  )
                    ? 'attacked'
                    : ''}"
                >
                  {#each cardInstance.card.attacks as [[rowOffset, colOffset], attackPower]}
                    {#if rowOffset + 2 === rowIndex && colOffset + 2 === colIndex}
                      {attackPower}
                    {/if}
                  {/each}
                </div>
              {/each}
            {/each}
          </div>
          <name>
            {cardInstance.name}
          </name>
        </div>
        <div class="amount">
          <input
            type="number"
            min="0"
            max="5"
            bind:value={cardAmounts[cardInstance.name]}
          />
        </div>
      </div>
    {/each}
  </div>
  <div class="buttons">
    <button class="new-game" onclick={startNewGame}>Start New Game</button>
  </div>
</menu>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  menu {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
  }

  .cards {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .card {
    width: 100px;
    height: 150px;
    padding: 5px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f9f9f9;
    font-weight: bold;
    text-align: center;
  }

  .card-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .attack-grid {
    display: grid;
    grid-template-columns: repeat(5, 15px);
    grid-template-rows: repeat(5, 15px);
    gap: 3px;
  }

  .attack-cell {
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  .attack-cell.attacked {
    background-color: #ffcccc;
  }

  .attack-cell.center {
    background-color: #ffffcc;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
