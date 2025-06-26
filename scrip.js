document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Optional: Close mobile menu if active
            // if (navMenu.classList.contains('active')) {
            //     navMenu.classList.remove('active');
            // }
        });
    });

    // --- Background Music Control ---
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = '<span class="icon">&#9658;</span> <span class="text">Mainkan Melodi</span>'; // Play icon (triangle)
    const pauseIcon = '<span class="icon">&#10074;&#10074;</span> <span class="text">Jeda Melodi</span>'; // Pause icon (double bar)

    let isPlaying = false; // Track music state

    // Initial state setup for the button
    playPauseBtn.innerHTML = playIcon;

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            music.pause();
            playPauseBtn.innerHTML = playIcon;
        } else {
            // Attempt to play, catch potential errors like autoplay block
            music.play().then(() => {
                playPauseBtn.innerHTML = pauseIcon;
            }).catch(error => {
                console.error("Autoplay blocked or error playing music:", error);
                // Inform user if autoplay failed
                alert("Browser Anda mungkin memblokir pemutaran musik otomatis. Silakan izinkan atau coba lagi.");
                playPauseBtn.innerHTML = playIcon; // Reset button if play fails
            });
        }
        isPlaying = !isPlaying; // Toggle state
    });

    // --- Fade-In On Scroll for Sections (About & Music) ---
    const faders = document.querySelectorAll('.about-section, .music-section');

    const appearOptions = {
        threshold: 0.4, // Section will fade in when 40% of it is visible
        rootMargin: "0px 0px -50px 0px" // Start fade-in slightly before it's fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                appearOnScroll.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});