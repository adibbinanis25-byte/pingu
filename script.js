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
const photos = Array.from(
    document.querySelectorAll("#memories .photo img")
);

const gallery = document.getElementById("gallery");
const galleryImage = document.getElementById("gallery-image");
const galleryCount = document.getElementById("gallery-count");

let currentPhoto = 0;

function openGallery(index) {
    currentPhoto = index;
    showPhoto();
    gallery.classList.add("active");
    document.body.style.overflow = "hidden";
}

function showPhoto() {
    galleryImage.src = photos[currentPhoto].src;
    galleryImage.alt = photos[currentPhoto].alt || "Memory";
    galleryCount.textContent =
        `${currentPhoto + 1} / ${photos.length}`;
}

function changePhoto(direction) {
    currentPhoto =
        (currentPhoto + direction + photos.length) % photos.length;
    showPhoto();
}

function closeGallery() {
    gallery.classList.remove("active");
    document.body.style.overflow = "";
}

photos.forEach((photo, index) => {
    photo.addEventListener("click", () => openGallery(index));
});

gallery.addEventListener("click", (event) => {
    if (event.target === gallery) closeGallery();
});

document.addEventListener("keydown", (event) => {
    if (!gallery.classList.contains("active")) return;

    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowRight") changePhoto(1);
    if (event.key === "ArrowLeft") changePhoto(-1);
});

// Swipe left or right on a phone
let touchStartX = 0;

gallery.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

gallery.addEventListener("touchend", (event) => {
    const distance =
        event.changedTouches[0].screenX - touchStartX;

    if (Math.abs(distance) < 50) return;

    changePhoto(distance < 0 ? 1 : -1);
}, { passive: true });