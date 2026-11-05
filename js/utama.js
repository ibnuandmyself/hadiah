document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DARK MODE DENGAN LOCALSTORAGE ---
    const darkToggle = document.getElementById('darkToggle');
    const btnIcon = darkToggle.querySelector('.btn-icon');
    const btnText = darkToggle.querySelector('.btn-text');

    const updateThemeUI = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            btnIcon.textContent = '☀️';
            if (btnText) btnText.textContent = 'Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            btnIcon.textContent = '🌙';
            if (btnText) btnText.textContent = 'Dark Mode';
        }
    };

    // Cek preferensi yang tersimpan sebelumnya
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        updateThemeUI(true);
    }

    darkToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeUI(isDark);
    });

    // --- 2. PEMUTAR MUSIK LATAR (OPSIONAL) ---
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicIcon.textContent = '🎵';
            } else {
                bgMusic.play().then(() => {
                    musicIcon.textContent = '⏸️';
                }).catch(() => {
                    // Browser memblokir autoplay jika belum ada interaksi pengguna
                    console.log('Interaksi diperlukan untuk memutar audio');
                });
            }
            isPlaying = !isPlaying;
        });
    }

    // --- 3. EFEK FLOATING HEARTS DI LATAR ---
    const heartContainer = document.getElementById('heart-container');
    const hearts = ['🤍', '✨', '🌸', '🤍', '🕊️'];

    function createFloatingHeart() {
        if (!heartContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Posisi dan ukuran acak
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 4 + 7 + 's';
        heart.style.fontSize = Math.random() * 14 + 12 + 'px';
        
        heartContainer.appendChild(heart);

        // Hapus elemen setelah selesai melayang
        setTimeout(() => {
            heart.remove();
        }, 11000);
    }

    // Buat hati melayang setiap 1.5 detik
    setInterval(createFloatingHeart, 1500);

    // --- 4. KLIK UNTUK MUNCULKAN HATI KECIL (INTERAKTIF) ---
    document.addEventListener('click', (e) => {
        // Jangan picu jika yang diklik tombol atau link
        if (e.target.closest('button') || e.target.closest('a')) return;

        const popHeart = document.createElement('div');
        popHeart.textContent = '🤍';
        popHeart.style.position = 'fixed';
        popHeart.style.left = `${e.clientX}px`;
        popHeart.style.top = `${e.clientY}px`;
        popHeart.style.pointerEvents = 'none';
        popHeart.style.fontSize = '18px';
        popHeart.style.transform = 'translate(-50%, -50%) scale(0.6)';
        popHeart.style.transition = 'all 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
        popHeart.style.opacity = '1';
        popHeart.style.zIndex = '9999';

        document.body.appendChild(popHeart);

        requestAnimationFrame(() => {
            popHeart.style.transform = 'translate(-50%, -80px) scale(1.4)';
            popHeart.style.opacity = '0';
        });

        setTimeout(() => popHeart.remove(), 700);
    });
});
