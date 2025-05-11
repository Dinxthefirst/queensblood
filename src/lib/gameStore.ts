import { writable } from "svelte/store";
import { newGame } from "./game";
import type { Game } from "./types";

const game = writable<Game>(newGame());

export default game;
