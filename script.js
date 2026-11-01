
const bgMusic = document.getElementById("bgMusic");

let isMusicPlaying = false;
let isCakeCut = false;

// Birthday Website Load
window.addEventListener("DOMContentLoaded", () => {

    // Automatic music attempt
    playMusic();

    // Welcome confetti
    setTimeout(() => {
        fireConfetti();
    }, 700);

});

// Automatic Music
async function playMusic() {

    if (isMusicPlaying) return;

    try {

        await bgMusic.play();

        isMusicPlaying = true;

        console.log("Birthday music is playing!");

    } catch (error) {

        console.log(
            "Browser autoplay blocked. Waiting for user interaction."
        );

    }

}

// If autoplay is blocked, first click or tap starts music
function startMusicOnInteraction() {

    if (!isMusicPlaying) {
        playMusic();
    }

    document.removeEventListener(
        "click",
        startMusicOnInteraction
    );

    document.removeEventListener(
        "touchstart",
        startMusicOnInteraction
    );

}

document.addEventListener(
    "click",
    startMusicOnInteraction
);

document.addEventListener(
    "touchstart",
    startMusicOnInteraction
);


// Cake Cutting Animation
function cutCake() {

    const cakeBox = document.getElementById("cakeBox");
    const flame = document.getElementById("flame");
    const cakeHint = document.getElementById("cakeHint");

    if (!isCakeCut) {

        cakeBox.classList.add("cut");

        flame.classList.add("off");

        cakeHint.innerText = "Yay! Cake is cut! 🍰";

        isCakeCut = true;

        fireConfetti();

    } else {

        cakeBox.classList.remove("cut");

        flame.classList.remove("off");

        cakeHint.innerText = "Tap the cake to cut it! 🎂";

        isCakeCut = false;

    }

}


// Confetti Animation
function fireConfetti() {

    if (typeof confetti !== "function") {
        return;
    }

    const count = 200;

    const defaults = {
        origin: {
            y: 0.7
        }
    };

    function fire(particleRatio, options) {

        confetti(
            Object.assign(
                {},
                defaults,
                options,
                {
                    particleCount: Math.floor(
                        count * particleRatio
                    )
                }
            )
        );

    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55
    });

    fire(0.2, {
        spread: 60
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45
    });

}


// Open Birthday Wish
function openWish() {

    const modal = document.getElementById("wishModal");

    modal.classList.add("active");

    fireConfetti();

}


// Close Birthday Wish
function closeWish() {

    const modal = document.getElementById("wishModal");

    modal.classList.remove("active");

}


// Close Modal by Clicking Outside
function outsideClose(event) {

    if (event.target.id === "wishModal") {

        closeWish();

    }

}


// Close Modal with Escape Key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeWish();

    }

});
