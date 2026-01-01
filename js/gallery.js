/* =====================
   DARK MODE
===================== */
const toggleBtn = document.getElementById("darkToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "on") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("darkMode", "on");
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("darkMode", "off");
    }
});


/* =====================
   FULLSCREEN MODAL
===================== */
const photos = document.querySelectorAll(".photo img");

const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-img">
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector(".modal-img");
const closeBtn = modal.querySelector(".close");

let currentIndex = 0;
const imgArray = Array.from(photos);

photos.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};


/* =====================
   SWIPE (MOBILE)
===================== */
let startX = 0;

modalImg.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

modalImg.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (diff > 50) showNext();
    if (diff < -50) showPrev();
});

function showNext() {
    currentIndex = (currentIndex + 1) % imgArray.length;
    modalImg.src = imgArray[currentIndex].src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + imgArray.length) % imgArray.length;
    modalImg.src = imgArray[currentIndex].src;
}


/* =====================
   SCROLL ANIMATION
===================== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".photo").forEach(photo => {
    observer.observe(photo);
});
