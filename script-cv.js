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
});
