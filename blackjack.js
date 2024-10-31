const suits = ["S", "C", "H", "D"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

let playerHand = [];
let dealerHand = [];

let playerScore = 0;
let dealerScore = 0;
let gameOver = false;

let playerWins = 0;
let dealerWins = 0;

function getCardValue(card) {
    if (["J", "Q", "K"].includes(card.value)) return 10;
    if (card.value === "A") return 11;
    return parseInt(card.value);
}

function updateScores() {
    playerScore = HandScore(playerHand);
    dealerScore = HandScore(dealerHand);
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("dealerScore").textContent = dealerScore;
}

function HandScore(hand) {
    let score = hand.reduce((total, card) => total + getCardValue(card), 0);
    let aceCount = hand.filter(card => card.value === "A").length;

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
}

function generateRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
}

function displayHand(hand, elementId) {
    const handContainer = document.getElementById(elementId);
    handContainer.innerHTML = "";

    hand.forEach(card => {
        const cardImg = document.createElement("img");
        cardImg.src = `images/${card.value}${card.suit}.png`;
        cardImg.alt = `${card.value} of ${card.suit}`;
        cardImg.style.width = "50px";
        cardImg.style.margin = "5px";
        handContainer.appendChild(cardImg);
    });
}

function startNewGame() {
    playerHand = [generateRandomCard(), generateRandomCard()];
    dealerHand = [generateRandomCard(), generateRandomCard()];

    updateScores();
    displayHand(playerHand, "playerHand");
    displayHand(dealerHand, "dealerHand");

    document.getElementById("result").textContent = "";
    document.getElementById("nextRoundButton").style.display = "none";
    gameOver = false;
}

function hit() {
    if (gameOver) return;

    playerHand.push(generateRandomCard());
    displayHand(playerHand, "playerHand");
    updateScores();

    if (playerScore > 21) {
        document.getElementById("result").textContent = "Гравець програв! Ви набрали більше ніж 21.";
        dealerWins++;
        endRound();
    }
}

function stand() {
    if (gameOver) return;

    while (dealerScore < 17) {
        dealerHand.push(generateRandomCard());
        updateScores();
        displayHand(dealerHand, "dealerHand");
    }

    if (dealerScore > 21) {
        document.getElementById("result").textContent = "Комп'ютер програв! Ви виграли!";
        playerWins++;
    } else if (dealerScore > playerScore) {
        document.getElementById("result").textContent = "Комп'ютер виграв!";
        dealerWins++;
    } else if (dealerScore < playerScore) {
        document.getElementById("result").textContent = "Ви виграли!";
        playerWins++;
    } else {
        document.getElementById("result").textContent = "Нічия!";
    }

    endRound();
}

function endRound() {
    updateGameResult();
    gameOver = true;
    document.getElementById("nextRoundButton").style.display = "block"; // Показати кнопку "Наступний раунд"
}

function updateGameResult() {
    document.getElementById("playerWins").textContent = playerWins;
    document.getElementById("dealerWins").textContent = dealerWins;

    if (playerWins === 3 || dealerWins === 3) {
        document.getElementById("overallResult").textContent = playerWins === 3
            ? "Вітаємо! Ви виграли серію до 3 перемог!"
            : "Комп'ютер виграв серію до 3 перемог. Спробуйте ще раз!";
        playerWins = 0;
        dealerWins = 0;
    }
}

function nextRound() {
    startNewGame();
}

startNewGame();
