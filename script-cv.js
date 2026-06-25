document.addEventListener("DOMContentLoaded", () => {
    const hunCv = document.getElementById("hun-cv");
    const engCv = document.getElementById("eng-cv");
    const langBtn = document.getElementById("lang-toggle");
    const flagIcon = document.getElementById("flag-icon");

    // SVG flag definitions
    const englishFlag = `
        <rect width="28" height="20" fill="#012169"/>
        <path d="M0 0L28 20M28 0L0 20" stroke="#fff" stroke-width="3.5"/>
        <path d="M0 0L28 20M28 0L0 20" stroke="#C8102E" stroke-width="2"/>
        <path d="M14 0V20M0 10H28" stroke="#fff" stroke-width="5.5"/>
        <path d="M14 0V20M0 10H28" stroke="#C8102E" stroke-width="3"/>
    `;

    const hungarianFlag = `
        <rect width="28" height="6.67" y="0" fill="#CE2939"/>
        <rect width="28" height="6.67" y="6.67" fill="#FFFFFF"/>
        <rect width="28" height="6.67" y="13.33" fill="#397D3B"/>
    `;

    // Load language preference (default to Hungarian)
    const storedLang = localStorage.getItem("site-lang") || "hu";
    let showingHungarian = storedLang === "hu";

    // Function to translate inline elements with data-hu and data-en attributes
    function translateElements(isHu) {
        const translatableElements = document.querySelectorAll("[data-hu][data-en]");
        translatableElements.forEach(el => {
            el.textContent = isHu ? el.getAttribute("data-hu") : el.getAttribute("data-en");
        });
    }

    // Set initial display based on language selection
    if (showingHungarian) {
        hunCv.classList.remove("hidden");
        engCv.classList.add("hidden");
        if (flagIcon) flagIcon.innerHTML = englishFlag;
        document.documentElement.lang = "hu";
    } else {
        hunCv.classList.add("hidden");
        engCv.classList.remove("hidden");
        if (flagIcon) flagIcon.innerHTML = hungarianFlag;
        document.documentElement.lang = "en";
    }
    translateElements(showingHungarian);

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            if (showingHungarian) {
                // Switch to English CV
                hunCv.classList.add("hidden");
                engCv.classList.remove("hidden");

                // Re-trigger fade animation
                engCv.style.animation = "none";
                engCv.offsetHeight; // force reflow
                engCv.style.animation = "";

                // Show Hungarian flag (click to go back)
                flagIcon.innerHTML = hungarianFlag;
                showingHungarian = false;
                document.documentElement.lang = "en";
                localStorage.setItem("site-lang", "en");
            } else {
                // Switch back to Hungarian CV
                engCv.classList.add("hidden");
                hunCv.classList.remove("hidden");

                // Re-trigger fade animation
                hunCv.style.animation = "none";
                hunCv.offsetHeight; // force reflow
                hunCv.style.animation = "";

                // Show English flag (click to switch to English)
                flagIcon.innerHTML = englishFlag;
                showingHungarian = true;
                document.documentElement.lang = "hu";
                localStorage.setItem("site-lang", "hu");
            }
            translateElements(showingHungarian);
        });
    }

    // Mobile navigation toggle
    const menuToggle = document.getElementById("menu-toggle");
    const cvNav = document.getElementById("cv-navigation");
    const menuBackdrop = document.getElementById("menu-backdrop");

    if (menuToggle && cvNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            menuToggle.classList.toggle("active");
            cvNav.classList.toggle("active");
            if (menuBackdrop) {
                menuBackdrop.classList.toggle("active");
            }
        });

        // Close menu when clicking a link
        const navLinks = cvNav.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.classList.remove("active");
                cvNav.classList.remove("active");
                if (menuBackdrop) {
                    menuBackdrop.classList.remove("active");
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (cvNav.classList.contains("active") && !cvNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.classList.remove("active");
                cvNav.classList.remove("active");
                if (menuBackdrop) {
                    menuBackdrop.classList.remove("active");
                }
            }
        });

        if (menuBackdrop) {
            menuBackdrop.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.classList.remove("active");
                cvNav.classList.remove("active");
                menuBackdrop.classList.remove("active");
            });
        }
    }

    // ─── Mobile Gallery ───
    function initMobileGallery(sectionEl) {
        const imagesSide = sectionEl.querySelector('.cv-images-side');
        if (!imagesSide) return;

        const images = imagesSide.querySelectorAll('img');
        if (images.length === 0) return;

        // Find the last bio-text paragraph to insert gallery after it
        const bioTexts = sectionEl.querySelectorAll('.bio-text');
        if (bioTexts.length === 0) return;
        const lastBioText = bioTexts[bioTexts.length - 1];

        // Build gallery HTML
        const gallery = document.createElement('div');
        gallery.className = 'mobile-gallery';

        const track = document.createElement('div');
        track.className = 'gallery-track';

        images.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            const clonedImg = img.cloneNode(true);
            slide.appendChild(clonedImg);
            track.appendChild(slide);
        });

        gallery.appendChild(track);

        // Dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'gallery-dots';
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Image ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        gallery.appendChild(dotsContainer);

        // Counter
        const counter = document.createElement('div');
        counter.className = 'gallery-counter';
        counter.textContent = `1 / ${images.length}`;
        gallery.appendChild(counter);

        // Insert after last bio-text
        lastBioText.insertAdjacentElement('afterend', gallery);

        // Gallery logic
        let currentIndex = 0;
        const totalSlides = images.length;

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update dots
            dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
            // Update counter
            counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
        }

        // Touch swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let isHorizontalSwipe = null;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            isHorizontalSwipe = null;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // Determine swipe direction on first significant movement
            if (isHorizontalSwipe === null && (Math.abs(diffX) > 8 || Math.abs(diffY) > 8)) {
                isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            }

            if (isHorizontalSwipe) {
                e.preventDefault();
                const offset = -currentIndex * 100 + (diffX / track.offsetWidth) * 100;
                track.style.transform = `translateX(${offset}%)`;
            }
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = '';
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            const threshold = 50;

            if (isHorizontalSwipe) {
                if (diff < -threshold && currentIndex < totalSlides - 1) {
                    goToSlide(currentIndex + 1);
                } else if (diff > threshold && currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(currentIndex); // snap back
                }
            }
        }, { passive: true });
    }

    // Initialize mobile galleries for both language sections
    if (hunCv) initMobileGallery(hunCv);
    if (engCv) initMobileGallery(engCv);
});
