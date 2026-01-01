/* DARK MODE */
const toggleBtn = document.getElementById("darkToggle");
const body = document.body;

if (localStorage.getItem("darkMode") === "on") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    const dark = body.classList.contains("dark");

    toggleBtn.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", dark ? "on" : "off");
});

/* COPY */
document.querySelectorAll(".copy").forEach(item => {
    item.addEventListener("click", () => {
        navigator.clipboard.writeText(item.dataset.copy);
        item.classList.add("copied");
        item.textContent = "✅ Copied";

        setTimeout(() => {
            item.classList.remove("copied");
            item.textContent = item.dataset.copy.includes("@")
                ? "🎵 " + item.dataset.copy
                : "📧 " + item.dataset.copy;
        }, 1200);
    });
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("show");
    });
}, { threshold: 0.2 });

reveals.forEach(r => observer.observe(r));
