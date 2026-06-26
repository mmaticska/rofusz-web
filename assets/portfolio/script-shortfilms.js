document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("lang-toggle");
    const flagIcon = document.getElementById("flag-icon");
    const menuToggle = document.getElementById("menu-toggle");
    const cvNav = document.getElementById("cv-navigation");
    const menuBackdrop = document.getElementById("menu-backdrop");

    // Video View Elements
    const filmsGridView = document.getElementById("films-grid-view");
    const videoPlayerView = document.getElementById("video-player-view");
    const videosContainer = document.getElementById("videos-container");
    const videoViewBack = document.getElementById("video-view-back");
    const binderCards = document.querySelectorAll(".portfolio-card");

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

        // Show opposite flag on the switcher
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
    const storedLang = sessionStorage.getItem("site-lang") || "hu";
    updateLanguage(storedLang);

    // Language Toggle Click Event
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            const currentLang = sessionStorage.getItem("site-lang") || "hu";
            const newLang = currentLang === "hu" ? "en" : "hu";
            sessionStorage.setItem("site-lang", newLang);
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

    // Map of specific short films video configurations
    const videoData = {
        "film-a-ko-1973": {
            videos: [
                { src: "-E0ISmDYInw", isYouTube: true }
            ]
        },
        "film-the-fly-1980": {
            videos: [
                { src: "https://player.vimeo.com/video/719425512?autoplay=1", isYouTube: false }
            ],
            externalLink: "https://vimeo.com/719425512"
        },
        "film-the-fly-workshop": {
            videos: [
                {
                    src: "ZibZ-cxqdL0",
                    isYouTube: true,
                    autoplay: true,
                    labelHu: "01 - Storyboard",
                    labelEn: "01 - Storyboard"
                },
                {
                    src: "ctwS-hmObKQ",
                    isYouTube: true,
                    autoplay: false,
                    labelHu: "02 - Inbetween (Fázisrajz)",
                    labelEn: "02 - Inbetween"
                },
                {
                    src: "70bJIgmnkH8",
                    isYouTube: true,
                    autoplay: false,
                    labelHu: "03 - Stopmotion rajz",
                    labelEn: "03 - Stopmotion drawing"
                }
            ]
        },
        "film-deadlock-1982": {
            videos: [
                { src: "https://player.vimeo.com/video/1201196090?h=69ab38bc46&autoplay=1", isYouTube: false }
            ],
            externalLink: "https://vimeo.com/1201196090"
        },
        "film-gravity-1984": {
            videos: [
                { src: "bb9zlU9ceGQ", isYouTube: true }
            ]
        },
        "film-ceasefire-2002": {
            videos: [
                { src: "eSWakvv6Im4", isYouTube: true }
            ]
        },
        "film-ticket-2011": {
            videos: [
                { src: "06-5FXfsj5c", isYouTube: true }
            ]
        },
        "film-last-supper-2018": {
            videos: [
                {
                    src: "WnN2--dAHxY",
                    isYouTube: true,
                    autoplay: true,
                    labelHu: "Magyar verzió",
                    labelEn: "Hungarian version"
                },
                {
                    src: "FShD5TfZnKo",
                    isYouTube: true,
                    autoplay: false,
                    labelHu: "Angol verzió",
                    labelEn: "English version"
                }
            ]
        },
        "film-bosch-2022": {
            videos: [
                { src: "hER_IzYE_hY", isYouTube: true }
            ]
        }
    };

    // Card Click -> Play Video
    binderCards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const cardId = card.getAttribute("id");
            
            // Clear container to stop playback and remove old videos
            videosContainer.innerHTML = "";
            
            // Set the main title of the player view based on card-title
            const cardTitleEl = card.querySelector(".card-title");
            const mainTitleHu = cardTitleEl ? cardTitleEl.getAttribute("data-hu") : "";
            const mainTitleEn = cardTitleEl ? cardTitleEl.getAttribute("data-en") : "";
            
            const currentLang = sessionStorage.getItem("site-lang") || "hu";
            const isHu = currentLang === "hu";

            const mainTitleEl = document.getElementById("player-main-title");
            if (mainTitleEl) {
                mainTitleEl.setAttribute("data-hu", mainTitleHu);
                mainTitleEl.setAttribute("data-en", mainTitleEn);
                mainTitleEl.textContent = isHu ? mainTitleHu : mainTitleEn;
            }
            
            const config = videoData[cardId];
            
            let videosToRender = [];
            if (!config || !config.videos || config.videos.length === 0) {
                // Fallback to data-video attribute if configuration is missing
                const fallbackSource = card.getAttribute("data-video") || "guQoQUC1ltE";
                videosToRender = [{
                    src: fallbackSource,
                    isYouTube: !fallbackSource.startsWith("http"),
                    autoplay: true
                }];
            } else {
                videosToRender = config.videos;
            }

            // Set dual-layout style if there is more than 1 video
            if (videosToRender.length > 1) {
                videoPlayerView.classList.add("dual-layout");
            } else {
                videoPlayerView.classList.remove("dual-layout");
            }

            // Create and append video elements dynamically
            videosToRender.forEach((v, idx) => {
                let embedUrl = "";
                if (v.isYouTube) {
                    const autoplayParam = (idx === 0 && v.autoplay !== false) || v.autoplay === true ? "?autoplay=1" : "";
                    embedUrl = `https://www.youtube.com/embed/${v.src}${autoplayParam}`;
                } else {
                    embedUrl = v.src;
                }

                // Create video item container
                const videoItem = document.createElement("div");
                videoItem.className = "video-item";
                videoItem.id = `video-item-${idx + 1}`;

                // Create title
                const titleEl = document.createElement("div");
                titleEl.className = "video-title";
                titleEl.id = `video-title-${idx + 1}`;
                if (v.labelHu && v.labelEn) {
                    titleEl.setAttribute("data-hu", v.labelHu);
                    titleEl.setAttribute("data-en", v.labelEn);
                    titleEl.textContent = isHu ? v.labelHu : v.labelEn;
                } else {
                    titleEl.classList.add("hidden");
                }
                videoItem.appendChild(titleEl);

                // Create video wrapper and iframe
                const wrapper = document.createElement("div");
                wrapper.className = "video-wrapper";

                const iframe = document.createElement("iframe");
                iframe.id = `video-iframe-${idx + 1}`;
                iframe.src = embedUrl;
                iframe.title = v.labelHu || "Video player";
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
                iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
                iframe.setAttribute("allowfullscreen", "");

                wrapper.appendChild(iframe);
                videoItem.appendChild(wrapper);

                videosContainer.appendChild(videoItem);
            });
            
            filmsGridView.classList.add("hidden");
            videoPlayerView.classList.remove("hidden");
            
            // Scroll to top of the content area
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Close Video -> Show Grid View
    if (videoViewBack) {
        videoViewBack.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Stop videos and reset view
            videosContainer.innerHTML = "";
            videoPlayerView.classList.add("hidden");
            filmsGridView.classList.remove("hidden");
            
            // Scroll back
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close video on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoPlayerView && !videoPlayerView.classList.contains("hidden")) {
            videosContainer.innerHTML = "";
            videoPlayerView.classList.add("hidden");
            filmsGridView.classList.remove("hidden");
        }
    });
});
