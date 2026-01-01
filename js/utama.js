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
   ARTICLE FADE IN
===================== */
window.addEventListener("load", () => {
    const article = document.querySelector("article");
    article.style.opacity = "0";
    article.style.transform = "translateY(40px)";

    setTimeout(() => {
        article.style.transition = "all 1s ease";
        article.style.opacity = "1";
        article.style.transform = "translateY(0)";
    }, 200);
});


/* =====================
   TYPEWRITER EFFECT
===================== */
const paragraph = document.querySelector("article p");
const fullText = paragraph.innerHTML;
paragraph.innerHTML = "";

let index = 0;
const typingSpeed = 50;

function typeText() {
    if (index < fullText.length) {
        paragraph.innerHTML += fullText.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    }
}

setTimeout(typeText, 600);


/* =====================
   BACKGROUND MUSIC
===================== */
const audio = new Audio("music.mp3"); // taruh file music.mp3 di folder yang sama
audio.loop = true;
audio.volume = 0.25;

document.body.addEventListener("click", () => {
    if (audio.paused) {
        audio.play().catch(() => {});
    }
}, { once: true });


/* =====================
   NAV CLICK EFFECT
===================== */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
            link.style.transform = "scale(1)";
        }, 150);
    });
});
