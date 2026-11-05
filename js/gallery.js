document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. TEMA DARK MODE (TERHUBUNG KE LOCALSTORAGE)
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

    // Cek preferensi tersimpan
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
    // 2. LIGHTBOX MODAL & KONTROL (SWIPE + KEYBOARD)
    // ==========================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalCounter = document.getElementById("modalCounter");
    const closeBtn = document.getElementById("modalClose");
    const prevBtn = document.getElementById("modalPrev");
    const nextBtn = document.getElementById("modalNext");

    const photos = Array.from(document.querySelectorAll(".photo img"));
    let currentIndex = 0;

    const updateModalView = (index) => {
        currentIndex = (index + photos.length) % photos.length;
        modalImg.src = photos[currentIndex].src;
        modalCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
    };

    const openModal = (index) => {
        updateModalView(index);
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Kunci scroll halaman
    };

    const closeModal = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    photos.forEach((img, idx) => {
        img.addEventListener("click", () => openModal(idx));
    });

    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", () => updateModalView(currentIndex - 1));
    nextBtn.addEventListener("click", () => updateModalView(currentIndex + 1));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Navigasi Keyboard (Esc, Panah Kiri, Panah Kanan)
    window.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") updateModalView(currentIndex - 1);
        if (e.key === "ArrowRight") updateModalView(currentIndex + 1);
    });

    // Sentuhan / Swipe di Mobile
    let touchStartX = 0;
    modalImg.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    modalImg.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (diff > 50) updateModalView(currentIndex + 1); // Swipe kiri -> next
        if (diff < -50) updateModalView(currentIndex - 1); // Swipe kanan -> prev
    }, { passive: true });

    // ==========================================
    // 3. ANIMASI MUNCUL SAAT SCROLL (REVEAL)
    // ==========================================
    const photoCards = document.querySelectorAll(".photo");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    photoCards.forEach((card) => observer.observe(card));

    // ==========================================
    // 4. BACKGROUND FLOATING HEARTS & PARTICLES
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
        if (e.target.closest("button") || e.target.closest("a") || e.target.closest(".photo")) return;

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
