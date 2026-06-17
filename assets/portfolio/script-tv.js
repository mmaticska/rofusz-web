document.addEventListener("DOMContentLoaded", () => {
    // Video View Elements
    const tvGridView = document.getElementById("tv-grid-view");
    const videoPlayerView = document.getElementById("video-player-view");
    const videosContainer = document.getElementById("videos-container");
    const videoViewBack = document.getElementById("video-view-back");
    const commercialCards = document.querySelectorAll(".commercial-card");

    // Map of specific TV series video configurations
    const videoData = {
        "tv-hoppi-mesek": {
            isTrailer: true,
            videos: [
                {
                    src: "https://player.vimeo.com/video/127597343?h=4f5b814b7b",
                    isYouTube: false,
                    autoplay: true,
                    labelHu: "Magyar verzió",
                    labelEn: "Hungarian version"
                },
                {
                    src: "https://player.vimeo.com/video/127597342?h=c6ccd57eed",
                    isYouTube: false,
                    autoplay: false,
                    labelHu: "Angol verzió",
                    labelEn: "English version"
                }
            ]
        },
        "tv-piros-vereb": {
            isTrailer: false,
            videos: [
                {
                    src: "X9p6LmjyMAc",
                    isYouTube: true,
                    autoplay: true,
                    labelHu: "Magyar verzió",
                    labelEn: "Hungarian version"
                },
                {
                    src: "4sZnBtZ-Hw4",
                    isYouTube: true,
                    autoplay: false,
                    labelHu: "Angol verzió",
                    labelEn: "English version"
                }
            ]
        }
    };

    // Card Click -> Play Video
    commercialCards.forEach(card => {
        if (card.classList.contains("static-card")) return;

        card.addEventListener("click", (e) => {
            e.preventDefault();
            const cardId = card.getAttribute("id");
            const config = videoData[cardId];
            if (!config) return;

            // Clear container to stop playback and remove old videos
            videosContainer.innerHTML = "";

            // Set the main title of the player view based on card-title
            const cardTitleEl = card.querySelector(".card-title");
            const baseTitleHu = cardTitleEl ? cardTitleEl.getAttribute("data-hu") : "";
            const baseTitleEn = cardTitleEl ? cardTitleEl.getAttribute("data-en") : "";
            const mainTitleHu = config.isTrailer ? `${baseTitleHu} - előzetes` : baseTitleHu;
            const mainTitleEn = config.isTrailer ? `${baseTitleEn} - trailer` : baseTitleEn;

            const currentLang = localStorage.getItem("site-lang") || "en";
            const isHu = currentLang === "hu";

            const mainTitleEl = document.getElementById("player-main-title");
            if (mainTitleEl) {
                mainTitleEl.setAttribute("data-hu", mainTitleHu);
                mainTitleEl.setAttribute("data-en", mainTitleEn);
                mainTitleEl.textContent = isHu ? mainTitleHu : mainTitleEn;
            }

            const videosToRender = config.videos;

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
                    if ((idx === 0 && v.autoplay !== false) || v.autoplay === true) {
                        embedUrl += embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1';
                    }
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
                iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share");
                iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
                iframe.setAttribute("allowfullscreen", "");

                wrapper.appendChild(iframe);
                videoItem.appendChild(wrapper);

                videosContainer.appendChild(videoItem);
            });

            if (tvGridView) tvGridView.classList.add("hidden");
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
            if (tvGridView) tvGridView.classList.remove("hidden");

            // Scroll back
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Close video on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && videoPlayerView && !videoPlayerView.classList.contains("hidden")) {
            videosContainer.innerHTML = "";
            videoPlayerView.classList.add("hidden");
            if (tvGridView) tvGridView.classList.remove("hidden");
        }
    });
});
