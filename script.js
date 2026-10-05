let enteredPin = "";

const correctPin = "2310";

const pinDisplay = document.getElementById("pinDisplay");
const wrongPin = document.getElementById("wrongPin");

function pressNumber(number) {

    if (enteredPin.length >= 4) {
        return;
    }

    enteredPin += number;

    updatePinDisplay();

    if (enteredPin.length === 4) {

        setTimeout(checkPin, 200);

    }

}


function deleteNumber() {

    enteredPin = enteredPin.slice(0, -1);

    updatePinDisplay();

}


function updatePinDisplay() {

    const dots = pinDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {
            dot.textContent = "●";
        } else {
            dot.textContent = "○";
        }

    });

}


function checkPin() {

    if (enteredPin === correctPin) {

        wrongPin.textContent = "";

        unlockWebsite();

    } else {

        wrongPin.textContent = "Hmm... Pandu's not giving you the right hint? 😭";

        enteredPin = "";

        updatePinDisplay();

    }

}


function unlockWebsite() {

    const lockScreen = document.getElementById("lockScreen");
    const website = document.getElementById("website");

    lockScreen.classList.add("unlock-animation");

    setTimeout(() => {

        lockScreen.style.display = "none";

        website.classList.remove("hidden");

        window.scrollTo(0, 0);

        const song = document.getElementById("birthdaySong");

        song.play().catch(() => {
            console.log("Music needs user interaction.");
        });

    }, 1000);

}


function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });

}