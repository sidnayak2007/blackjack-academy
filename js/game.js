window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );

                if (loader) {

                    loader.style.display =
                        "none";

                }

            },
            2500
        );

    }
);
/* ==========================
THEME SYSTEM
========================== */

function applyTheme() {

const currentTheme =
    localStorage.getItem(
        "currentTheme"
    );

document.body.style.background =
    "";

if (!currentTheme) {

    return;

}

switch (currentTheme) {

    case "gold":

        document.body.style.background =
            "linear-gradient(#145a32,#0a2f1d)";
        break;

    case "diamond":

        document.body.style.background =
            "linear-gradient(#1565c0,#0d47a1)";
        break;

    case "neon":

        document.body.style.background =
            "linear-gradient(#7b1fa2,#4a148c)";
        break;

    case "rcb":

        document.body.style.background =
            "linear-gradient(#8b0000,#111111)";
        break;

    case "royal":

        document.body.style.background =
            "linear-gradient(#111111,#000000)";
        break;

    default:

        document.body.style.background =
            "";

}


}

applyTheme();

const suits = ["♠", "♥", "♦", "♣"];

const values = [
    "A","2","3","4","5","6",
    "7","8","9","10",
    "J","Q","K"
];
let deck = [];

let playerHand = [];
let dealerHand = [];

let gameOver = true;

let currentBet = 500;

let coins =
Number(
localStorage.getItem(
"purushCoins"
)
) || 10000;

let stats =
JSON.parse(
localStorage.getItem(
"blackjackStats"
)
) || {

    
    games: 0,
    wins: 0,
    losses: 0,
    blackjacks: 0

};

function saveStats() {


localStorage.setItem(
    "blackjackStats",
    JSON.stringify(stats)
);


}

function updateStatsDisplay() {


document.getElementById(
    "games-played"
).textContent =
    stats.games;

document.getElementById(
    "wins"
).textContent =
    stats.wins;

document.getElementById(
    "losses"
).textContent =
    stats.losses;

document.getElementById(
    "blackjacks"
).textContent =
    stats.blackjacks;


}

function showMessage(message) {


const result =
    document.getElementById(
        "result-message"
    );

result.textContent =
    message;

result.classList.remove(
    "win-message"
);

if (
    message.includes("🎉")
) {

    result.classList.add(
        "win-message"
    );

}


}

function updateCoins() {


const coinDisplay =
    document.getElementById(
        "coin-balance"
    );

let current =
    Number(
        coinDisplay.textContent
    ) || 0;

const target = coins;

const interval =
    setInterval(() => {

        if (current < target) {

            current +=
                Math.ceil(
                    (target - current) / 10
                );

        }

        else if (
            current > target
        ) {

            current -=
                Math.ceil(
                    (current - target) / 10
                );

        }

        else {

            clearInterval(
                interval
            );

        }

        coinDisplay.textContent =
            current;

    }, 20);

localStorage.setItem(
    "purushCoins",
    coins
);


}

function showWinAmount(amount) {


const winDisplay =
    document.getElementById(
        "floating-win"
    );

winDisplay.textContent =
    "+" + amount + " PC";

winDisplay.classList.remove(
    "show-win"
);

void winDisplay.offsetWidth;

winDisplay.classList.add(
    "show-win"
);


}

function updateBet() {


document.getElementById(
    "bet-display"
).textContent =
    currentBet + " PC";


}
function createDeck() {


deck = [];

for (let suit of suits) {

    for (let value of values) {

        deck.push({
            value,
            suit
        });

    }

}


}

function shuffleDeck() {


for (
    let i = deck.length - 1;
    i > 0;
    i--
) {

    const j =
        Math.floor(
            Math.random() *
            (i + 1)
        );

    [deck[i], deck[j]] =
    [deck[j], deck[i]];

}


}

function drawCard() {


return deck.pop();


}

function calculateScore(hand) {


let score = 0;

let aces = 0;

hand.forEach(card => {

    if (card.value === "A") {

        score += 11;

        aces++;

    }

    else if (

        card.value === "K" ||
        card.value === "Q" ||
        card.value === "J"

    ) {

        score += 10;

    }

    else {

        score +=
            Number(card.value);

    }

});

while (

    score > 21 &&
    aces > 0

) {

    score -= 10;

    aces--;

}

return score;


}

function displayHands() {


const playerCards =
    document.getElementById(
        "player-cards"
    );

const dealerCards =
    document.getElementById(
        "dealer-cards"
    );

playerCards.innerHTML = "";

dealerCards.innerHTML = "";

playerHand.forEach(card => {

    const cardDiv =
        document.createElement(
            "div"
        );

    cardDiv.classList.add(
        "card"
    );

    cardDiv.textContent =
        card.value +
        card.suit;

    playerCards.appendChild(
        cardDiv
    );

});

dealerHand.forEach(
    (card, index) => {

    const cardDiv =
        document.createElement(
            "div"
        );

    cardDiv.classList.add(
        "card"
    );

    if (

        index === 1 &&
        !gameOver

    ) {

        cardDiv.textContent =
            "🂠";

    }

    else {

        cardDiv.textContent =
            card.value +
            card.suit;

        if (

            index === 1 &&
            gameOver

        ) {

            cardDiv.classList.add(
                "reveal-card"
            );

        }

    }

    dealerCards.appendChild(
        cardDiv
    );

});

document.getElementById(
    "player-score"
).textContent =
    "Score: " +
    calculateScore(
        playerHand
    );

if (!gameOver) {

    document.getElementById(
        "dealer-score"
    ).textContent =
        "Score: ?";

}

else {

    document.getElementById(
        "dealer-score"
    ).textContent =
        "Score: " +
        calculateScore(
            dealerHand
        );

}


}
function addBet(amount) {


if (!gameOver) return;

currentBet += amount;

updateBet();


}

function resetBet() {


if (!gameOver) return;

currentBet = 500;

updateBet();


}

function maxBet() {


if (!gameOver) return;

currentBet = coins;

updateBet();


}

function checkBlackjack() {


const playerScore =
    calculateScore(
        playerHand
    );

if (playerScore === 21) {

    const payout =
        Math.floor(
            currentBet * 2.5
        );

    coins += payout;

    stats.wins++;
    stats.blackjacks++;

    saveStats();

    updateStatsDisplay();

    updateCoins();

    showWinAmount(
        payout
    );

    gameOver = true;

    displayHands();

    showMessage(
        "🎉 BLACKJACK! +" +
        payout +
        " PC"
    );

}


}

function startGame() {


if (!gameOver) return;

if (coins < currentBet) {

    showMessage(
        "❌ Not Enough Coins"
    );

    return;

}

stats.games++;

saveStats();

updateStatsDisplay();

coins -= currentBet;

updateCoins();

createDeck();

shuffleDeck();

playerHand = [];

dealerHand = [];

gameOver = false;

playerHand.push(
    drawCard()
);

dealerHand.push(
    drawCard()
);

playerHand.push(
    drawCard()
);

dealerHand.push(
    drawCard()
);

displayHands();

showMessage(
    "Choose HIT or STAND"
);

checkBlackjack();


}

function hit() {


if (gameOver) return;

playerHand.push(
    drawCard()
);

displayHands();

if (

    calculateScore(
        playerHand
    ) > 21

) {

    gameOver = true;

    stats.losses++;

    saveStats();

    updateStatsDisplay();

    displayHands();

    showMessage(
        "💀 BUST!"
    );

}


}

function doubleDown() {


if (gameOver) return;

if (coins < currentBet) {

    showMessage(
        "❌ Not Enough Coins"
    );

    return;

}

coins -= currentBet;

currentBet *= 2;

updateCoins();

updateBet();

playerHand.push(
    drawCard()
);

displayHands();

if (

    calculateScore(
        playerHand
    ) > 21

) {

    gameOver = true;

    stats.losses++;

    saveStats();

    updateStatsDisplay();

    showMessage(
        "💀 BUST!"
    );

    return;

}

stand();


}

function determineWinner() {


const playerScore =
    calculateScore(
        playerHand
    );

const dealerScore =
    calculateScore(
        dealerHand
    );

if (dealerScore > 21) {

    const payout =
        currentBet * 2;

    coins += payout;

    stats.wins++;

    saveStats();

    updateStatsDisplay();

    updateCoins();

    showWinAmount(
        payout
    );

    showMessage(
        "🎉 Dealer Bust! +" +
        payout +
        " PC"
    );

}

else if (

    playerScore >
    dealerScore

) {

    const payout =
        currentBet * 2;

    coins += payout;

    stats.wins++;

    saveStats();

    updateStatsDisplay();

    updateCoins();

    showWinAmount(
        payout
    );

    showMessage(
        "🎉 You Win! +" +
        payout +
        " PC"
    );

}

else if (

    playerScore <
    dealerScore

) {

    stats.losses++;

    saveStats();

    updateStatsDisplay();

    showMessage(
        "💀 Dealer Wins"
    );

}

else {

    coins += currentBet;

    updateCoins();

    showMessage(
        "🤝 Push"
    );

}


}

function stand() {


if (gameOver) return;

while (

    calculateScore(
        dealerHand
    ) < 17

) {

    dealerHand.push(
        drawCard()
    );

}

gameOver = true;

displayHands();

determineWinner();


}

document
.getElementById("deal-btn")
.addEventListener(
"click",
startGame
);

document
.getElementById("hit-btn")
.addEventListener(
"click",
hit
);

document
.getElementById("stand-btn")
.addEventListener(
"click",
stand
);

document
.getElementById("double-btn")
.addEventListener(
"click",
doubleDown
);

document
.getElementById("bet100")
.addEventListener(
"click",
() => addBet(100)
);

document
.getElementById("bet500")
.addEventListener(
"click",
() => addBet(500)
);

document
.getElementById("bet1000")
.addEventListener(
"click",
() => addBet(1000)
);

document
.getElementById("reset-bet-btn")
.addEventListener(
"click",
resetBet
);

document
.getElementById("max-bet-btn")
.addEventListener(
"click",
maxBet
);

updateCoins();

updateBet();

updateStatsDisplay();

showMessage(
    "Place Your Bets"
);
const currentTheme =
    localStorage.getItem(
        "currentTheme"
    );

if (currentTheme) {

    switch (currentTheme) {

        case "gold":
            document.body.style.background =
                "linear-gradient(#145a32,#0a2f1d)";
            break;

        case "diamond":
            document.body.style.background =
                "linear-gradient(#1565c0,#0d47a1)";
            break;

        case "neon":
            document.body.style.background =
                "linear-gradient(#7b1fa2,#4a148c)";
            break;

        case "rcb":
            document.body.style.background =
                "linear-gradient(#8b0000,#111111)";
            break;

        case "royal":
            document.body.style.background =
                "linear-gradient(#111111,#000000)";
            break;
    }

}
const shopBtn =
    document.getElementById(
        "shop-page"
    );

if (shopBtn) {

    shopBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "shop.html";

        }
    );

}

const profileBtn =
    document.getElementById(
        "profile-page"
    );

if (profileBtn) {

    profileBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "profile.html";

        }
    );

}

const learnBtn =
    document.getElementById(
        "learn-page"
    );

if (learnBtn) {

    learnBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "learn.html";

        }
    );

}