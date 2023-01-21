const board = document.getElementById("board");
const playAgainButton = document.getElementById("button-82-pushable");

playAgainButton.addEventListener("click", play);

const col = 2;
const row = 2;

let winCondition = 0;
let num1;
let num2;
let inPlay;
let mat;

function play() {
    board.innerHTML = ""
    mat = generateMatrix(row, col);
    generateBoard(mat);
    playAgainButton.style.display = "none";
    board.style.display = "grid";
}

function generateMatrix(row, col) {
    const numMap = {};

    for (let i = 1; i <= row * col; ++i) {
        numMap[i] = 0;
    }

    const res = [];

    for (let i = 0; i < row; ++i) {
        const tmp = [];
        let j = 0;
        while (j < col) {
            const num = Math.floor((Math.random() * (row * col)) / 2 + 1);
            if (numMap[num] < 2) {
                tmp.push(num);
                numMap[num]++;
                j++;
            }
        }
        res.push(tmp);
    }

    return res;
}

function cardClicked(e) {
    console.log(e);

    if (inPlay) return;

    let [i, j] = e.target.id.split("_");
    i = parseInt(i);
    j = parseInt(j);

    const num = mat[i][j];

    e.target.textContent = num;
    e.target.style.color = "black";
    e.target.style.pointerEvents = "none";

    if (num1 === undefined) num1 = e.target;
    else if (num1 && num2 === undefined) {
        num2 = e.target;
        inPlay = true;
        setTimeout(() => {
            if (num1.textContent === num2.textContent) {
                num1.style.backgroundColor = "rgb(216, 27, 96)";
                num2.style.backgroundColor = "rgb(216, 27, 96)";
                num1.style.pointerEvents = "none";
                num2.style.pointerEvents = "none";
                num1.textContent = "$";
                num2.textContent = "$";
                num1.style.color = "rgb(216, 27, 96)";
                num2.style.color = "rgb(216, 27, 96)";
                winCondition += 2;
                checkWin(winCondition);
            } else {
                num1.textContent = "$";
                num1.style.color = "rgb(248, 187, 208)";
                num1.style.pointerEvents = "auto";
                num2.textContent = "$";
                num2.style.color = "rgb(248, 187, 208)";
                num2.style.pointerEvents = "auto";
            }
            num2 = undefined;
            num1 = undefined;
            inPlay = false;
        }, 1000);
    }
}

function generateBoard(matrix) {
    board.style.gridTemplateColumns = (() => {
        let str = "";
        for (let i = 0; i < matrix.length; ++i) {
            str += "1fr ";
        }
        return str;
    })();

    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[0].length; ++j) {
            const card = document.createElement("div");
            card.classList.add("card");
            card.id = i.toString() + "_" + j.toString();
            card.addEventListener("click", cardClicked);
            card.textContent = "$";
            card.style.color = "rgb(248, 187, 208)";
            board.append(card);
        }
    }
}

function checkWin(count) {
    if (count >= row * col) {
        board.style.display = "none";
        playAgainButton.style.display = "block";
        winCondition = 0
    }
}

play();
