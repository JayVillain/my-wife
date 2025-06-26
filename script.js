document.addEventListener('DOMContentLoaded', function() {
    
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Hero Section Typed Text Animation ---
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const heroTexts = [
            "Cinta dalam Setiap Bingkai",
            "Setiap Cahaya, Pesonamu",
            "Kisah Kita yang Abadi",
            "Hatiku Melalui Lensa Ini"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 60;
        const delayBeforeDelete = 1500;
        const delayBeforeType = 800;

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
        typeEffect();
    }

    // --- Hero Section Parallax Effect ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset;
            // The 'scale' is now fixed in the CSS, JS only handles the Y-translation
            heroImage.style.transform = `translateY(${scrollY * heroImage.dataset.speed}px) scale(1.05)`;
        });
    }

    // --- Background Music Control ---
    const music = document.getElementById('background-music');
    const musicControlBtn = document.getElementById('music-control-btn');
    const playIcon = musicControlBtn.querySelector('.icon-play');
    const pauseIcon = musicControlBtn.querySelector('.icon-pause');

    function tryPlayMusic() {
        music.play().then(() => {
            console.log("Musik berhasil diputar secara otomatis.");
            musicControlBtn.style.display = 'flex';
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        }).catch(error => {
            console.error("Autoplay diblokir:", error);
            // Show the button so user can manually play
            musicControlBtn.style.display = 'flex';
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
    }

    musicControlBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            music.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });
    
    // Attempt to play music after a brief moment
    setTimeout(tryPlayMusic, 1000);


    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxMessage = document.getElementById('lightbox-message');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        const item = galleryItems[currentImageIndex];
        if (item) {
            lightboxImage.src = item.dataset.src;
            lightboxMessage.textContent = item.dataset.message;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
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
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // --- Intersection Observer for Fade-In Sections ---
    // SIMPLIFIED: Now targets only one class for consistency
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeSections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Heart Message Section Typed Text Animation ---
    const heartMessageElement = document.querySelector('.heart-message-section .typed-message');
    const finalParagraph = document.querySelector('.heart-message-section .final-paragraph');
    const heartMessageSection = document.getElementById('heart-message');
    let heartAnimationStarted = false;

    if (heartMessageElement && finalParagraph && heartMessageSection) {
        const fullHeartMessage = `Untukmu, aku telah mengumpulkan fragmen-fragmen keindahanmu, membiarkan cahayamu bercerita. Setiap potret adalah janji, setiap ekspresi adalah desah kagumku. Ini adalah persembahanku, bukti nyata dari cintaku yang tak terbatas.`;
        let heartCharIndex = 0;
        const heartTypingSpeed = 70;

        function typeHeartMessage() {
            if (heartCharIndex < fullHeartMessage.length) {
                heartMessageElement.textContent += fullHeartMessage.charAt(heartCharIndex);
                heartCharIndex++;
                setTimeout(typeHeartMessage, heartTypingSpeed);
            } else {
                setTimeout(() => {
                    finalParagraph.style.opacity = '1';
                    finalParagraph.style.transition = 'opacity 2s ease-in';
                }, 1000);
            }
        }

        const heartMessageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !heartAnimationStarted) {
                    heartAnimationStarted = true;
                    heartMessageElement.style.opacity = '1';
                    heartMessageElement.style.transition = 'opacity 1s ease-in';
                    typeHeartMessage();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        heartMessageObserver.observe(heartMessageSection);
    }
});