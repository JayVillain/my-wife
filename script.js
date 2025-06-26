document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Hero Section Typed Text Animation ---
    const typedTextElement = document.getElementById('typed-text');
    const heroTexts = [
        "Cinta dalam Setiap Bingkai",
        "Setiap Cahaya, Pesonamu",
        "Kisah Kita yang Abadi",
        "Hatiku Melalui Lensa Ini"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // ms per character
    const deletingSpeed = 60; // ms per character
    const delayBeforeDelete = 1500; // ms before deleting
    const delayBeforeType = 800; // ms before typing next text

    function typeEffect() {
        const currentText = heroTexts[textIndex];
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            currentSpeed = delayBeforeDelete;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % heroTexts.length;
            currentSpeed = delayBeforeType;
        }

        setTimeout(typeEffect, currentSpeed);
    }
    typeEffect(); // Start the typing effect

    // --- Hero Section Parallax Effect ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollY * heroImage.dataset.speed}px) scale(1.05)`;
        });
    }

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
            music.play().then(() => {
                playPauseBtn.innerHTML = pauseIcon;
            }).catch(error => {
                console.error("Autoplay blocked or error playing music:", error);
                alert("Browser Anda mungkin memblokir pemutaran musik otomatis. Silakan izinkan atau coba lagi.");
                playPauseBtn.innerHTML = playIcon; // Reset button if play fails
            });
        }
        isPlaying = !isPlaying; // Toggle state
    });

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxMessage = document.getElementById('lightbox-message');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item')); // Convert NodeList to Array
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        const item = galleryItems[currentImageIndex];
        if (item) {
            lightboxImage.src = item.dataset.src;
            lightboxMessage.textContent = item.dataset.message;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling body
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = ''; // Restore body scrolling
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openLightbox(currentImageIndex);
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentImageIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });

    // --- Intersection Observer for Fade-In Sections & Gallery Items ---
    const fadeSections = document.querySelectorAll('.fade-in-section, .section-title, .about-section, .heart-message-section, .music-section');

    const appearOptions = {
        threshold: 0.2, // Section will fade in when 20% of it is visible
        rootMargin: "0px 0px -100px 0px" // Start fade-in slightly before it's fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScrollObserver) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                appearOnScrollObserver.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, appearOptions);

    fadeSections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // --- Lazy Loading for Images (Basic) ---
    const lazyLoadImages = document.querySelectorAll('img[data-src]'); // Not directly used in this HTML, but good practice for future
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('src'); // Use src if you prefer src for initial load
                // Or if using data-src for lazy load:
                // img.src = img.dataset.src;
                // img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // Load images when they are 200px from viewport
    });

    // For simplicity, current HTML uses direct src. If you want true lazy loading:
    // 1. Change <img src="assets/images/gallery/photo_1.jpg"> to <img data-src="assets/images/gallery/photo_1.jpg">
    // 2. Add a small placeholder src for initial load: <img src="placeholder.jpg" data-src="...">
    // 3. Uncomment/adjust the img.src = img.dataset.src; part above.
    // galleryItems.forEach(item => {
    //     const img = item.querySelector('img');
    //     if (img) imageObserver.observe(img);
    // });


    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Heart Message Section Typed Text Animation ---
    const heartMessageElement = document.querySelector('.heart-message-section .typed-message');
    const finalParagraph = document.querySelector('.heart-message-section .final-paragraph');
    const fullHeartMessage = `Untukmu, aku telah mengumpulkan fragmen-fragmen keindahanmu, membiarkan cahayamu bercerita. Setiap potret adalah janji, setiap ekspresi adalah desah kagumku. Ini adalah persembahanku, bukti nyata dari cintaku yang tak terbatas.`;

    let heartCharIndex = 0;
    let heartTypingSpeed = 70; // Adjust typing speed

    function typeHeartMessage() {
        if (heartCharIndex < fullHeartMessage.length) {
            heartMessageElement.textContent += fullHeartMessage.charAt(heartCharIndex);
            heartCharIndex++;
            setTimeout(typeHeartMessage, heartTypingSpeed);
        } else {
            // Once typing is done, fade in the final paragraph
            setTimeout(() => {
                finalParagraph.style.opacity = '1';
                finalParagraph.style.transition = 'opacity 2s ease-in';
            }, 1000); // Delay before final paragraph fades in
        }
    }

    // Observe heart message section to start typing animation
    const heartMessageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heartMessageElement.style.opacity = '1'; // Make sure typed message element is visible
                heartMessageElement.style.transition = 'opacity 1s ease-in';
                typeHeartMessage();
                heartMessageObserver.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Start typing when 50% of section is visible

    heartMessageObserver.observe(document.getElementById('heart-message'));
});