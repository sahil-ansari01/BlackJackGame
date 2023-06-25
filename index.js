let player = {
    name: "Guest",
    chips: 150
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if (player.chips >= 10) {
        isAlive = true;
        hasBlackJack = false;
        player.chips -= 10; // Decrease chips by 10
        playerEl.textContent = player.name + ": $" + player.chips;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        renderGame();
    } else {
        messageEl.textContent = "Insufficient chips to start the game!";
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 20; // Reward 20 chips for getting blackjack
        playerEl.textContent = player.name + ": $" + player.chips;
    } else {
        message = "You're out of the game! Start new game";
        isAlive = false;
    }
    messageEl.textContent = message;

    if (!isAlive && player.chips <= 0) {
        messageEl.textContent += " Game over. Refresh the page to start again.";
    }
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}
