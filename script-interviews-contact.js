document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("lang-toggle");
    const flagIcon = document.getElementById("flag-icon");
    const menuToggle = document.getElementById("menu-toggle");
    const cvNav = document.getElementById("cv-navigation");
    const menuBackdrop = document.getElementById("menu-backdrop");

    // English/Hungarian specific content blocks
    const hunInterviews = document.getElementById("hun-interviews");
    const engInterviews = document.getElementById("eng-interviews");
    const hunContact = document.getElementById("hun-contact");
    const engContact = document.getElementById("eng-contact");

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

    // Function to apply language changes
    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        const isHu = lang === "hu";

        // Show opposite flag on the button (clicking switches to that language)
        if (flagIcon) {
            flagIcon.innerHTML = isHu ? englishFlag : hungarianFlag;
        }

        // Toggle full section elements if they exist
        if (hunInterviews && engInterviews) {
            if (isHu) {
                hunInterviews.classList.remove("hidden");
                engInterviews.classList.add("hidden");
            } else {
                hunInterviews.classList.add("hidden");
                engInterviews.classList.remove("hidden");
            }
        }

        if (hunContact && engContact) {
            if (isHu) {
                hunContact.classList.remove("hidden");
                engContact.classList.add("hidden");
            } else {
                hunContact.classList.add("hidden");
                engContact.classList.remove("hidden");
            }
        }

        // Dynamically translate inline elements with data-hu and data-en attributes
        const translatableElements = document.querySelectorAll("[data-hu][data-en]");
        translatableElements.forEach(el => {
            el.textContent = isHu ? el.getAttribute("data-hu") : el.getAttribute("data-en");
        });
    }

    // Load stored language preference (default to English)
    const storedLang = localStorage.getItem("site-lang") || "en";
    updateLanguage(storedLang);

    // Language Toggle Click Event
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            const currentLang = localStorage.getItem("site-lang") || "en";
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
});
