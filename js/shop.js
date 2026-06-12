let coins =
Number(
localStorage.getItem(
"purushCoins"
)
) || 0;

document.getElementById(
"coin-balance"
).textContent = coins;

const themes = {


"gold-theme": "gold",
"diamond-theme": "diamond",
"neon-theme": "neon",
"rcb-theme": "rcb",
"royal-theme": "royal"


};

const equippedTheme =
localStorage.getItem(
"currentTheme"
);

for (const id in themes) {


const button =
    document.getElementById(
        id
    );

const themeName =
    themes[id];

const owned =
    localStorage.getItem(
        id
    );

if (owned) {

    button.textContent =
        themeName === equippedTheme
        ? "Equipped"
        : "Equip";

}

button.addEventListener(
    "click",
    () => {

        if (!owned) {

            if (coins < 2500) {

                alert(
                    "Not Enough Coins!"
                );

                return;

            }

            coins -= 2500;

            localStorage.setItem(
                "purushCoins",
                coins
            );

            localStorage.setItem(
                id,
                "owned"
            );

            document.getElementById(
                "coin-balance"
            ).textContent =
                coins;

        }

        localStorage.setItem(
            "currentTheme",
            themeName
        );

        location.reload();

    }
);


}

document
.getElementById(
    "unequip-theme-btn"
)
.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "equippedTheme"
        );

        alert(
            "Theme Unequipped!"
        );

       window.location.href = 
          "index.html";

    }
);
document
.getElementById(
    "unequip-theme-btn"
)
.addEventListener(
    "click",
    () => {

        console.log(
            "Removing theme..."
        );

        localStorage.removeItem(
            "currentTheme"
        );

        console.log(
            localStorage.getItem(
                "currentTheme"
            )
        );

        location.reload();

    }
);