window.onload = function () {


const overlay =
    document.getElementById(
        "tutorial-overlay"
    );

const startButton =
    document.getElementById(
        "start-learning-btn"
    );

if (
    overlay &&
    startButton
) {

    startButton.addEventListener(
        "click",
        () => {

            overlay.style.display =
                "none";

        }
    );

}


};

const suits = [
"♠",
"♥",
"♦",
"♣"
];

const values = [
"A","2","3","4","5","6",
"7","8","9","10",
"J","Q","K"
];

let deck = [];

let playerHand = [];

let dealerHand = [];

let gameOver = true;

let correctMoves = 0;

let totalMoves = 0;

let recommendedMove = "";

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

    let i =
        deck.length - 1;

    i > 0;

    i--

) {

    const j =
        Math.floor(
            Math.random() *
            (i + 1)
        );

    [
        deck[i],
        deck[j]
    ] = [
        deck[j],
        deck[i]
    ];

}


}

function drawCard() {

return deck.pop();


}

function calculateScore(hand) {


let score = 0;

let aces = 0;

hand.forEach(card => {

    if (
        card.value === "A"
    ) {

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
            Number(
                card.value
            );

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

    const div =
        document.createElement(
            "div"
        );

    div.classList.add(
        "card"
    );

    div.textContent =
        card.value +
        card.suit;

    playerCards.appendChild(
        div
    );

});

dealerHand.forEach(
    (
        card,
        index
    ) => {

        const div =
            document.createElement(
                "div"
            );

        div.classList.add(
            "card"
        );

        if (

            index === 1 &&
            !gameOver

        ) {

            div.textContent =
                "🂠";

        }

        else {

            div.textContent =
                card.value +
                card.suit;

        }

        dealerCards.appendChild(
            div
        );

    }
);

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

function updateCoach() {


if (
    gameOver ||
    dealerHand.length === 0
) {
    return;
}

const playerScore =
    calculateScore(
        playerHand
    );

const dealerCard =
    dealerHand[0].value;

const coach =
    document.getElementById(
        "coach-feedback"
    );

let recommendation = "";
let explanation = "";

if (playerScore <= 11) {

    recommendation = "HIT";

    explanation =
        "You cannot bust with one card. Taking another card is always safe.";

}

else if (playerScore >= 17) {

    recommendation = "STAND";

    explanation =
        "Your hand is already strong. Hitting risks busting.";

}

else {

    if (

        dealerCard === "2" ||
        dealerCard === "3" ||
        dealerCard === "4" ||
        dealerCard === "5" ||
        dealerCard === "6"

    ) {

        recommendation = "STAND";

        explanation =
            "Dealer is showing a weak card and is more likely to bust.";

    }

    else {

        recommendation = "HIT";

        explanation =
            "Dealer is showing a strong card. Hitting gives a better long-term result.";

    }

}

recommendedMove =
    recommendation;

coach.innerHTML =

`
<h3>🎓 Strategy Coach</h3>

<p>
    Your Hand:
    ${playerScore}
</p>

<p>
    Dealer Shows:
    ${dealerCard}
</p>

<p>
    <strong>
        Recommended:
        ${recommendation}
    </strong>
</p>

<p>
    ${explanation}
</p>
`;


}

function startGame() {


createDeck();

shuffleDeck();

playerHand = [];

dealerHand = [];

gameOver = false;

playerHand.push(
    drawCard()
);

playerHand.push(
    drawCard()
);

dealerHand.push(
    drawCard()
);

dealerHand.push(
    drawCard()
);

displayHands();

updateCoach();

document.getElementById(
    "result-message"
).textContent =
    "Learning Round Started";


}

function hit() {


if (gameOver)
    return;

totalMoves++;

if (
    recommendedMove === "HIT"
) {

    correctMoves++;

}

playerHand.push(
    drawCard()
);

displayHands();

const playerScore =
    calculateScore(
        playerHand
    );

if (playerScore > 21) {

    gameOver = true;

    document.getElementById(
        "result-message"
    ).textContent =
        "💀 BUST";

    document.getElementById(
        "coach-feedback"
    ).innerHTML =

    `
    <h3>
        Round Review
    </h3>

    <p>
        You busted.
    </p>

    <p>
        Accuracy:
        ${Math.round(
            (correctMoves /
            totalMoves) * 100
        ) || 0}%
    </p>
    `;

    displayHands();

    return;

}

updateCoach();


}

function stand() {


if (gameOver)
    return;

totalMoves++;

if (
    recommendedMove === "STAND"
) {

    correctMoves++;

}

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

const playerScore =
    calculateScore(
        playerHand
    );

const dealerScore =
    calculateScore(
        dealerHand
    );

let result = "";

if (dealerScore > 21) {

    result =
        "🎉 Dealer Busts!";

}

else if (
    playerScore > dealerScore
) {

    result =
        "🎉 You Win!";

}

else if (
    playerScore < dealerScore
) {

    result =
        "💀 Dealer Wins";

}

else {

    result =
        "🤝 Push";

}

document.getElementById(
    "result-message"
).textContent =
    result;

const accuracy =
    Math.round(
        (
            correctMoves /
            totalMoves
        ) * 100
    ) || 0;

let grade = "F";

if (accuracy >= 90)
    grade = "A";

else if (
    accuracy >= 75
)
    grade = "B";

else if (
    accuracy >= 60
)
    grade = "C";

else if (
    accuracy >= 40
)
    grade = "D";

document.getElementById(
    "coach-feedback"
).innerHTML =

`
<h3>
    📊 Round Report
</h3>

<p>
    Player Score:
    ${playerScore}
</p>

<p>
    Dealer Score:
    ${dealerScore}
</p>

<p>
    Accuracy:
    ${accuracy}%
</p>

<h2>
    Grade:
    ${grade}
</h2>
`;


}

document
.getElementById(
"deal-btn"
)
.addEventListener(
"click",
startGame
);

document
.getElementById(
"hit-btn"
)
.addEventListener(
"click",
hit
);

document
.getElementById(
"stand-btn"
)
.addEventListener(
"click",
stand
);

console.log(
"Learn Mode Loaded"
);
