# Winstone's Wordle

A browser-based word guessing game built from scratch with HTML, CSS and vanilla JavaScript.

Players have six attempts to discover a randomly selected five-letter word. Each submitted guess is checked against the word list, then the tiles change colour to reveal which letters are correct, misplaced or absent.

## Features

- Random five-letter word selection
- Six attempts per game
- Physical keyboard input
- Word-list validation
- Accurate repeated-letter checking
- Colour-coded feedback for every guess
- Animated warning for invalid or incomplete words
- Win and loss messages
- Play-again button
- Shareable results using emoji tiles
- Clipboard fallback for wider browser support
- Custom favicon and responsive dark interface

## How to Play

1. Type a five-letter word using your keyboard.
2. Press `Enter` to submit your guess.
3. Use the tile colours as clues:
   - Green: the letter is correct and in the correct position.
   - Yellow: the letter is in the word but in a different position.
   - Grey: the letter is not in the word.
4. Press `Backspace` to remove a letter before submitting.
5. Find the hidden word within six guesses.

After the game, select **Share Results** to copy the emoji grid without revealing the answer.

## Built With

- HTML5
- CSS3
- JavaScript ES modules
- Google Fonts
- Clipboard API with a legacy fallback

## Project Structure

```text
.
├── index.html    # Game structure and controls
├── style.css     # Layout, tile states and animations
├── script.js     # Game logic, validation and sharing
├── words.js      # Five-letter word list
└── favicon.ico   # Browser tab icon
```

## Run Locally

Because the project uses JavaScript modules, run it through a local development server rather than opening `index.html` directly.

```bash
git clone https://github.com/winstone01/wordle-Game.git
cd wordle-Game
```

You can then use the VS Code **Live Server** extension, or run:

```bash
npx serve .
```

Open the local address shown in the terminal.

## Deploy on GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository's **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.

## What I Practised

This project helped me strengthen my understanding of:

- DOM creation and manipulation
- Keyboard events and input handling
- Arrays, loops and string methods
- Multi-pass comparison logic for repeated letters
- State management across guesses
- ES module imports
- Async clipboard handling and error recovery
- CSS animations and visual feedback

## Author

Created by **Winstone Anderson**, a UI-focused frontend developer based in London.

- [Portfolio](https://winstone01.github.io/website_mine/)
- [GitHub](https://github.com/winstone01)

---

Built after chasing a JavaScript white whale—and finally catching it. 🐋
