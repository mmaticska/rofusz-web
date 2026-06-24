document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("lang-toggle");
    const flagIcon = document.getElementById("flag-icon");
    const menuToggle = document.getElementById("menu-toggle");
    const cvNav = document.getElementById("cv-navigation");
    const menuBackdrop = document.getElementById("menu-backdrop");

    // Modal elements
    const cardTvSeries = document.getElementById("card-tvseries");
    const tvSeriesModal = document.getElementById("tvseries-modal");
    const modalBack = document.getElementById("modal-back");

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

    // Function to update document language and translate texts
    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        const isHu = lang === "hu";

        // Show opposite flag on the switcher (click to switch to the other language)
        if (flagIcon) {
            flagIcon.innerHTML = isHu ? englishFlag : hungarianFlag;
        }

        // Translate elements with data-hu and data-en attributes
        const translatableElements = document.querySelectorAll("[data-hu][data-en]");
        translatableElements.forEach(el => {
            el.textContent = isHu ? el.getAttribute("data-hu") : el.getAttribute("data-en");
        });
    }

    // Load language preference (default to Hungarian)
    const storedLang = localStorage.getItem("site-lang") || "hu";
    updateLanguage(storedLang);

    // Language Toggle Click Event
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            const currentLang = localStorage.getItem("site-lang") || "hu";
            const newLang = currentLang === "hu" ? "en" : "hu";
            localStorage.setItem("site-lang", newLang);
            updateLanguage(newLang);
        });
    }

    // Mobile navigation toggle logic
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

    // Modal Interaction Logic
    if (cardTvSeries && tvSeriesModal) {
        cardTvSeries.addEventListener("click", (e) => {
            e.preventDefault(); // Stop default navigation
            tvSeriesModal.classList.add("active");
            document.body.classList.add("no-scroll");
            window.location.hash = "tvseries";
        });
    }

    // Close Modal Event (Back Arrow)
    if (modalBack && tvSeriesModal) {
        modalBack.addEventListener("click", () => {
            tvSeriesModal.classList.remove("active");
            document.body.classList.remove("no-scroll");
            // Clear hash safely without reloading
            if (window.location.hash === "#tvseries") {
                history.replaceState(null, null, window.location.pathname);
            }
        });
    }

    // Close Modal with Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && tvSeriesModal && tvSeriesModal.classList.contains("active")) {
            tvSeriesModal.classList.remove("active");
            document.body.classList.remove("no-scroll");
            // Clear hash safely
            if (window.location.hash === "#tvseries") {
                history.replaceState(null, null, window.location.pathname);
            }
        }
    });

    // Auto-open sub-portfolio modal if hash is #tvseries on load
    if (window.location.hash === "#tvseries" && tvSeriesModal) {
        tvSeriesModal.classList.add("active");
        document.body.classList.add("no-scroll");
    }

    // Background rotation logic
    const cardImages = {
        "card-shortfilms": {
            path: "assets/portfolio/shortfilms/cover/",
            files: [
                "A_légy.jpg", "Bosch.jpg", "RofuszIntro_00001.jpg",
                "RofuszIntro_00007.jpg", "RofuszIntro_00008.jpg", "RofuszIntro_00012.jpg",
                "RofuszIntro_00016.jpg", "RofuszIntro_00018.jpg", "RofuszIntro_00019.jpg",
                "The_fly.jpg", "The_fly_workshop.jpg", "Ticket-sirásó03.jpg",
                "UV_210305.jpg", "a_ko_cover.jpg", "ceasefire.jpg", "deadlock.jpg", "dia08.jpg",
                "gravity.jpg", "last_supper.jpg"
            ]
        },
        "card-tvseries": {
            path: "assets/portfolio/tv-series/cover/",
            files: [
                "Hoppi_Plakat_projector.jpg", "Picture 097.jpg", "Picture 115.jpg",
                "Picture 116.jpg", "dia01.jpg", "image-0001.jpg", "img004.jpg",
                "img005.jpg", "img017.jpg", "katalogus_nagy_01.jpg", "snuggles the seal.jpg"
            ]
        },
        "card-design": {
            path: "assets/portfolio/design/cover/",
            files: [
                "Picture 021.jpg", "black  contour with glass pencil_01.jpg",
                "black  contour with glass pencil_03.jpg", "colour pencil on paper_19..jpg",
                "colour pencil on paper_21..jpg", "cover1.jpg", "cover2.jpg",
                "cover3.jpg", "oil painting style by colour pencil_01.jpg", "oil painting_01.jpg"
            ]
        },
        "card-commercials": {
            path: "assets/portfolio/commercials/cover/",
            files: [
                "cover1.jpg", "cover2.jpg", "cover3.jpg"
            ]
        },
        "card-showreel": {
            path: "assets/home/cover/",
            files: [
                "A Légy-kép.jpg", "A légy-035.jpg", "RofuszIntro_00001.jpg",
                "RofuszIntro_00003.jpg", "RofuszIntro_00005.jpg", "RofuszIntro_00006.jpg",
                "RofuszIntro_00007.jpg", "RofuszIntro_00008.jpg", "RofuszIntro_00009.jpg",
                "RofuszIntro_00010.jpg", "RofuszIntro_00011.jpg", "RofuszIntro_00012.jpg",
                "RofuszIntro_00013.jpg", "RofuszIntro_00014.jpg", "RofuszIntro_00015.jpg",
                "RofuszIntro_00016.jpg", "RofuszIntro_00017.jpg", "RofuszIntro_00018.jpg",
                "RofuszIntro_00019.jpg", "RofuszIntro_00020.jpg", "UV_210305.jpg",
                "colour pencil on paper_27..jpg", "colour pencil on paper_28..jpg",
                "dia05.jpg", "dia08.jpg"
            ]
        }
    };

    Object.keys(cardImages).forEach(cardId => {
        const card = document.getElementById(cardId);
        if (!card) return;

        const config = cardImages[cardId];
        let activeBg = card.querySelector(".card-bg.active");
        let nextBg = card.querySelector(".card-bg.next");
        if (!activeBg || !nextBg) return;

        // Choose a random starting image
        let currentIdx = Math.floor(Math.random() * config.files.length);
        activeBg.style.backgroundImage = `url('${config.path}${config.files[currentIdx]}')`;

        // Periodically transition to a new background
        setInterval(() => {
            if (config.files.length <= 1) return;

            let nextIdx;
            do {
                nextIdx = Math.floor(Math.random() * config.files.length);
            } while (nextIdx === currentIdx);
            
            currentIdx = nextIdx;
            const nextImgUrl = `url('${config.path}${config.files[nextIdx]}')`;

            // Prepare next element with new image
            nextBg.style.backgroundImage = nextImgUrl;
            
            // Trigger crossfade transition
            nextBg.classList.add("active");
            activeBg.classList.remove("active");

            // Swap roles of variables for next iteration
            const temp = activeBg;
            activeBg = nextBg;
            nextBg = temp;
        }, 6000 + Math.random() * 3000); // staggered timing between 6s and 9s
    });
});