<script lang="ts">
  import game from "$lib/gameStore";
  import type { Game } from "$lib/types";
  import { onMount } from "svelte";

  let currentGame: Game;
  let selectedCard: number | null = null;

  onMount(() => {
    const unsubscribe = game.subscribe((value) => {
      currentGame = value;
    });
    return unsubscribe;
  });

  function playCard(row: number, col: number) {
    if (!currentGame) return;
    if (selectedCard === null) {
      alert("Please select a card to play.");
      return;
    }
    const card = currentGame.hand.find((c) => c.id === selectedCard);
    if (!card) {
      alert("Selected card not found in hand.");
      return;
    }
    currentGame.playCard(selectedCard, row, col);
    game.set(currentGame);
  }
</script>

<main>
  {#if currentGame}
    <board>
      {#each currentGame.board as row, rowIndex}
        <div class="row">
          {#each row as cell, colIndex}
            <button class="cell" on:click={() => playCard(rowIndex, colIndex)}>
              {cell.card ? cell.card.name : cell.value}
            </button>
          {/each}
        </div>
      {/each}
    </board>

    <hand>
      {#each currentGame.hand as card}
        <button
          class="card {selectedCard === card.id ? 'selected' : ''}"
          on:click={() =>
            selectedCard === card.id
              ? (selectedCard = null)
              : (selectedCard = card.id)}
        >
          <div class="card-content">
            <cost>
              {"*".repeat(card.cost)}
            </cost>
            <value>
              {card.value}
            </value>
          </div>
          <name>
            {card.name}
          </name>
        </button>
      {/each}
    </hand>
  {:else}
    <p>Loading game...</p>
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  board {
    display: grid;
  }

  .row {
    display: flex;
  }

  .cell {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  .cell:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }

  hand {
    display: flex;
    gap: 10px;
    padding-top: 20px;
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

  .card:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }

  .card.selected {
    transform: translateY(-10px);
    border-color: #007bff;
  }

  .card-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
