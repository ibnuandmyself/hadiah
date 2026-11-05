document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. TEMA DARK MODE (SINKRON DENGAN HALAMAN LAIN)
    // ==========================================
    const toggleBtn = document.getElementById("darkToggle");
    const btnIcon = toggleBtn.querySelector(".btn-icon");
    const btnText = toggleBtn.querySelector(".btn-text");

    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add("dark");
            if (btnIcon) btnIcon.textContent = "☀️";
            if (btnText) btnText.textContent = "Light Mode";
        } else {
            document.body.classList.remove("dark");
            if (btnIcon) btnIcon.textContent = "🌙";
            if (btnText) btnText.textContent = "Dark Mode";
        }
    };

    // Sinkronkan preferensi tersimpan
    const savedTheme = localStorage.getItem("theme") || (localStorage.getItem("darkMode") === "on" ? "dark" : "light");
    applyTheme(savedTheme === "dark");

    toggleBtn.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        const themeValue = isDark ? "dark" : "light";
        localStorage.setItem("theme", themeValue);
        localStorage.setItem("darkMode", isDark ? "on" : "off");
        applyTheme(isDark);
    });

    // ==========================================
    // 2. SALIN KE PAPAN KLIP DENGAN TOAST NOTIFIKASI
    // ==========================================
    const toast = document.getElementById("toast");
    let toastTimeout;

    const showToast = (text) => {
        toast.textContent = text;
        toast.classList.add("show");
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 1800);
    };

    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const textToCopy = btn.getAttribute("data-copy");
            const hint = btn.querySelector(".copy-hint");
            const originalHint = hint.textContent;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Tampilan feedback tombol
                btn.classList.add("copied");
                hint.textContent = "Tersalin! ✓";
                showToast(`"${textToCopy}" tersalin! ✨`);

                setTimeout(() => {
                    btn.classList.remove("copied");
                    hint.textContent = originalHint;
                }, 1400);
            }).catch(() => {
                showToast("Gagal menyalin ❌");
            });
        });
    });

    // ==========================================
    // 3. ANIMASI SCROLL REVEAL
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("show");
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(r => observer.observe(r));

    // ==========================================
    // 4. FLOATING HEARTS DI LATAR BELAKANG
    // ==========================================
    const heartContainer = document.getElementById("heart-container");
    const icons = ["🤍", "✨", "🌸", "💜", "🕊️"];

    const createFloatingHeart = () => {
        if (!heartContainer) return;
        const el = document.createElement("div");
        el.className = "floating-heart";
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDuration = `${Math.random() * 4 + 7}s`;
        el.style.fontSize = `${Math.random() * 12 + 12}px`;

        heartContainer.appendChild(el);
        setTimeout(() => el.remove(), 11000);
    };

    setInterval(createFloatingHeart, 1600);

    // ==========================================
    // 5. INTERAKSI KLIK MUNCUL HATI KECIL
    // ==========================================
    document.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;

        const pop = document.createElement("div");
        pop.textContent = "🤍";
        pop.style.position = "fixed";
        pop.style.left = `${e.clientX}px`;
        pop.style.top = `${e.clientY}px`;
        pop.style.pointerEvents = "none";
        pop.style.fontSize = "18px";
        pop.style.transform = "translate(-50%, -50%) scale(0.6)";
        pop.style.transition = "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
        pop.style.opacity = "1";
        pop.style.zIndex = "99999";

        document.body.appendChild(pop);

        requestAnimationFrame(() => {
            pop.style.transform = "translate(-50%, -75px) scale(1.4)";
            pop.style.opacity = "0";
        });

        setTimeout(() => pop.remove(), 700);
    });
});
