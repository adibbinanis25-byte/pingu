
let enteredPin = "";

const correctPin = "2310";

const pinDisplay = document.getElementById("pinDisplay");
const wrongPin = document.getElementById("wrongPin");

// =========================
// PIN LOCK
// =========================

function pressNumber(number) {
    if (enteredPin.length >= 4) return;

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
    if (!pinDisplay) return;

    const dots = pinDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {
        dot.textContent = index < enteredPin.length ? "●" : "○";
    });
}

function checkPin() {
    if (enteredPin === correctPin) {
        if (wrongPin) wrongPin.textContent = "";
        unlockWebsite();
    } else {
        if (wrongPin) {
            wrongPin.textContent =
                "Hmm... Pandu's not giving you the right hint? 😭";
        }

        enteredPin = "";
        updatePinDisplay();
    }
}

function unlockWebsite() {
    const lockScreen = document.getElementById("lockScreen");
    const website = document.getElementById("website");

    if (!lockScreen || !website) return;

    lockScreen.classList.add("unlock-animation");

    setTimeout(() => {
        lockScreen.style.display = "none";
        website.classList.remove("hidden");

        window.scrollTo(0, 0);

        const song = document.getElementById("birthdaySong");

        if (song) {
            song.play().catch(() => {
                console.log("Music needs user interaction.");
            });
        }
    }, 1000);
}

// =========================
// SCROLL TO SECTION
// =========================

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// =========================
// PHOTO GALLERY
// =========================

document.addEventListener("DOMContentLoaded", function () {
    const photos = Array.from(
        document.querySelectorAll("#memories .photo img")
    );

    const gallery = document.getElementById("gallery");
    const galleryImage = document.getElementById("gallery-image");
    const galleryCount = document.getElementById("gallery-count");

    // Check that the gallery HTML exists
    if (
        photos.length === 0 ||
        !gallery ||
        !galleryImage ||
        !galleryCount
    ) {
        console.error(
            "Gallery setup error. Check #memories, .photo img, " +
            "#gallery, #gallery-image and #gallery-count."
        );
        return;
    }

    let currentPhoto = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    function showPhoto() {
        const photo = photos[currentPhoto];

        galleryImage.src = photo.src;
        galleryImage.alt = photo.alt || "Memory";

        galleryCount.textContent =
            `${currentPhoto + 1} / ${photos.length}`;
    }

    function openGallery(index) {
        currentPhoto = index;
        showPhoto();

        gallery.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeGallery() {
        gallery.classList.remove("active");
        document.body.style.overflow = "";
    }

    function changePhoto(direction) {
        currentPhoto =
            (currentPhoto + direction + photos.length) %
            photos.length;

        showPhoto();
    }

    // Tap any photo to open the gallery
    photos.forEach((photo, index) => {
        photo.style.cursor = "pointer";

        photo.addEventListener("click", function () {
            openGallery(index);
        });
    });

    // Close button
    const closeButton = gallery.querySelector(".gallery-close");

    if (closeButton) {
        closeButton.addEventListener("click", closeGallery);
    }

    // Previous and next buttons
    const previousButton = gallery.querySelector(".gallery-arrow.prev");
    const nextButton = gallery.querySelector(".gallery-arrow.next");

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            changePhoto(-1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            changePhoto(1);
        });
    }

    // Tap the dark background to close
    gallery.addEventListener("click", function (event) {
        if (event.target === gallery) {
            closeGallery();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (event) {
        if (!gallery.classList.contains("active")) return;

        if (event.key === "Escape") closeGallery();
        if (event.key === "ArrowRight") changePhoto(1);
        if (event.key === "ArrowLeft") changePhoto(-1);
    });

    // Swipe between photos on mobile
    gallery.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    gallery.addEventListener("touchend", function (event) {
        if (!gallery.classList.contains("active")) return;

        const endX = event.changedTouches[0].screenX;
        const endY = event.changedTouches[0].screenY;

        const distanceX = endX - touchStartX;
        const distanceY = endY - touchStartY;

        // Ignore vertical scrolling gestures
        if (
            Math.abs(distanceX) > 50 &&
            Math.abs(distanceX) > Math.abs(distanceY)
        ) {
            changePhoto(distanceX < 0 ? 1 : -1);
        }
    }, { passive: true });

    console.log("Photo gallery initialized:", photos.length, "photos");
});
