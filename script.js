import { words } from "./words.js";

const messageEl = document.querySelector("#message");
const playAgainEl = document.querySelector("#play-again");
const shareResultsBtnEl = document.querySelector("#share-results");

let currentRow;
let gameWon = false;
let currentGuessNumber = 1;
let currentGuess = "";
let correctWord = words[Math.floor(Math.random() * words.length)];
let finalResults = [];

console.log(correctWord);

generateGameBoard();

playAgainEl.addEventListener("click", () => {
	location.reload();
});

shareResultsBtnEl.addEventListener("click", () => {
	shareResults();
});

document.addEventListener("keydown", (event) => {
	const key = event.key;
	// console.log(key);
	if (!key.length) return;
	if (gameWon) return;
	if (key === "Backspace") {
		const newGuess = currentGuess.substring(0, currentGuess.length - 1);
		updateGuess(newGuess);
	} else if (key === "Enter") {
		submitGuess();
	} else if (key.length === 1 && key.match(/[a-z]/i) && currentGuess.length < 5) {
		const newGuess = (currentGuess = currentGuess + key.toUpperCase());
		updateGuess(newGuess);
	}
});

function displayMessage(message, ms = 2000) {
	messageEl.textContent = message;
	messageEl.style.opacity = 1;
	if (ms) {
		setTimeout(() => {
			messageEl.style.opacity = 0;
		}, ms);
	}
}

function generateGameBoard() {
	const gameBoard = document.getElementById("game-board");
	for (let i = 1; i <= 6; i++) {
		const newRow = document.createElement("div");
		newRow.id = `row-${i}`;
		newRow.classList.add("board-row");
		for (let b = 1; b <= 5; b++) {
			const newButton = document.createElement("div");
			newButton.classList.add("board-button");
			newButton.classList.add(`button-${b}`);
			newButton.classList.add("empty");

			newRow.appendChild(newButton);
		}
		gameBoard.appendChild(newRow);
	}
	currentRow = document.querySelector("#row-1");
}

function replaceCharacterAtIndex(str, index, replacement) {
	let chars = str.split("");
	chars[index] = replacement;
	return chars.join("");
}

function updateGuess(newGuess) {
	currentGuess = newGuess;
	let ind = 0;
	for (const el of currentRow.children) {
		if (newGuess[ind]) {
			el.textContent = newGuess[ind];
		} else {
			el.textContent = "";
		}
		ind += 1;
	}
}

function submitGuess() {
	if (currentGuess.length < 5) {
		displayMessage("Not enough letters!");
		currentRow.classList.add("animate-invalid");
		currentRow.addEventListener("animationend", () => {
			currentRow.classList.remove("animate-invalid");
		});
	} else {
		const validWord = words.find((w) => w === currentGuess.toLowerCase());
		if (!validWord) {
			displayMessage(`Not a Word!🧐`);
			currentRow.classList.add("animate-invalid");
			currentRow.addEventListener("animationend", () => {
				currentRow.classList.remove("animate-invalid");
			});
		} else {
			let correctCopy = correctWord;
			let correctLetters = 0;
			let guessResults = ["◼️", "◼️", "◼️", "◼️", "◼️"];
			for (let i = 0; i < currentGuess.length; i++) {
				const letter = currentGuess[i].toLowerCase();
				const letterButton = currentRow.getElementsByClassName(`button-${i + 1}`);
				if (letter === correctCopy[i]) {
					letterButton[0].classList.remove("empty");
					letterButton[0].classList.add("correct");
					correctCopy = replaceCharacterAtIndex(correctCopy, i, "_");
					guessResults[i] = "🟩";
					correctLetters += 1;
				}
			}
			for (let i = 0; i < currentGuess.length; i++) {
				const letter = currentGuess[i].toLowerCase();
				const letterButton = currentRow.getElementsByClassName(`button-${i + 1}`);
				if (correctCopy.includes(letter)) {
					letterButton[0].classList.remove("empty");
					letterButton[0].classList.add("partially-correct");
					const lastIndex = correctCopy.lastIndexOf(letter);
					correctCopy = replaceCharacterAtIndex(correctCopy, lastIndex, "_");
					guessResults[i] = "🟨";
				} else if (letterButton[0].classList.contains("empty")) {
					letterButton[0].classList.remove("empty");
					letterButton[0].classList.add("incorrect");
				}
			}
			finalResults.push(guessResults.join(""));
			if (correctLetters === 5) {
				displayMessage(`You Win! 😃`, 0);
				const gameWinEl = document.querySelector("#end-game");
				gameWinEl.style.opacity = 1;
			} else if (currentGuessNumber === 6) {
				displayMessage(`You lose! 🥺 : The correct word is ${correctWord} `, 0);
				const gameWinEl = document.querySelector("#end-game");
				gameWinEl.style.opacity = 1;
			} else {
				currentGuessNumber += 1;
				currentRow = document.querySelector(`#row-${currentGuessNumber}`);
				currentGuess = "";
			}
		}
	}
}

async function shareResults() {
	const textToCopy = [`Winstone's Wordle ${currentGuessNumber}/6`, ...finalResults].join("\n");

	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(textToCopy);
		} else {
			copyTextWithFallback(textToCopy);
		}
		document.querySelector("#shared").style.display = "block";
	} catch {
		displayMessage("Copy failed. Please copy the results manually.");
	}
}

function copyTextWithFallback(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.setAttribute("readonly", "");
	textArea.style.position = "fixed";
	textArea.style.opacity = "0";
	document.body.appendChild(textArea);
	textArea.select();

	const copied = document.execCommand("copy");
	textArea.remove();
	if (!copied) {
		throw new Error("Copy command was rejected");
	}
}
