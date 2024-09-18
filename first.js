let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msgcontainer = document.querySelector('.msg-container');
let drawMsg = document.querySelector('#draw-msg');

let turnO = true;
let win = false;
let filledBoxes = 0; // Track filled boxes count

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset the game state
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add('hide');
    filledBoxes = 0;
    win = false;
    drawMsg.innerText = ""; // Reset draw message
};

// Add event listener to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        filledBoxes++;

        checkWinner(); // Check if there's a winner
        if (!win) {
            checkDraw(); // Check if it's a draw after each move
        }
    });
});

// Check for a draw
const checkDraw = () => {
    if (filledBoxes === 9 && win === false) {
        drawMsg.innerText = "It's a draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};

// Enable all boxes for a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Disable all boxes once the game is over
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove('hide');
    disableBoxes();
};

// Check for a winning pattern
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                win = true;
                break;
            }
        }
    }
};

// Add event listeners for reset and new game buttons
newGameBtn.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);