const coins =
Number(
localStorage.getItem(
"purushCoins"
)
) || 0;

const stats =
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


const theme =
localStorage.getItem(
"currentTheme"
) || "None";

document.getElementById(
"profile-coins"
).textContent =
coins;

document.getElementById(
"profile-games"
).textContent =
stats.games;

document.getElementById(
"profile-wins"
).textContent =
stats.wins;

document.getElementById(
"profile-losses"
).textContent =
stats.losses;

document.getElementById(
"profile-blackjacks"
).textContent =
stats.blackjacks;

const winRate =


stats.games > 0

?

Math.round(
    (stats.wins /
    stats.games) * 100
)

:

0;


document.getElementById(
"profile-winrate"
).textContent =
winRate + "%";

document.getElementById(
"profile-theme"
).textContent =
theme;
