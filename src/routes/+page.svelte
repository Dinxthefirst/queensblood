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
      <ul>
        {#each currentGame.hand as card}
          <li>
            {card.name}
            <button on:click={() => (selectedCard = card.id)}>Select</button>
          </li>
        {/each}
      </ul>
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
    width: 50px;
    height: 50px;
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
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
  }

  hand ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  hand li {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  hand button {
    margin-top: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 14px;
  }

  hand button:hover {
    background-color: #0056b3;
  }
</style>
