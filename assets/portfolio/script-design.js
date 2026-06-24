document.addEventListener("DOMContentLoaded", () => {
    // Mapping of series/design categories to their image/video lists
    const categoryData = {
        "Dog's life": [
            { type: "video", src: "0AwBPg4m5t8" },
            { type: "image", src: "Picture 115.jpg" },
            { type: "image", src: "Picture 116.jpg" },
            { type: "image", src: "Picture 117.jpg" },
            { type: "image", src: "Picture 118.jpg" },
            { type: "image", src: "Picture 119.jpg" },
            { type: "image", src: "Picture 120.jpg" },
            { type: "image", src: "Picture 121.jpg" },
            { type: "image", src: "Picture 122.jpg" },
            { type: "image", src: "Picture 151.jpg" },
            { type: "image", src: "Picture 152.jpg" },
            { type: "image", src: "Picture 153.jpg" },
            { type: "image", src: "Picture 154.jpg" },
            { type: "image", src: "Picture 155.jpg" },
            { type: "image", src: "Picture 156.jpg" },
            { type: "image", src: "Picture 157.jpg" },
            { type: "image", src: "Picture 158.jpg" },
            { type: "image", src: "Picture 159.jpg" },
            { type: "image", src: "Picture 160.jpg" },
            { type: "image", src: "Picture 161.jpg" }
        ],
        "Hoppi tales": [
            { type: "image", src: "hoppi_characters_01.jpg" },
            { type: "image", src: "hoppi_characters_02.jpg" },
            { type: "image", src: "hoppi_characters_03.jpg" },
            { type: "image", src: "hoppi_characters_04.jpg" },
            { type: "image", src: "hoppi_characters_05.jpg" },
            { type: "image", src: "hoppi_characters_06.jpg" },
            { type: "image", src: "hoppi_latvany_01.jpg" },
            { type: "image", src: "hoppi_latvany_02.jpg" },
            { type: "image", src: "hoppi_latvany_03.jpg" },
            { type: "image", src: "hoppi_latvany_04.jpg" },
            { type: "image", src: "katalogus_nagy_01.jpg" }
        ],
        "Red Sparrow": [
            { type: "image", src: "img010.jpg" },
            { type: "image", src: "img011.jpg" },
            { type: "image", src: "img012.jpg" },
            { type: "image", src: "img013.jpg" }
        ],
        "Rupert": [
            { type: "image", src: "img031.jpg" },
            { type: "image", src: "img032.jpg" }
        ],
        "Rüdiger": [
            { type: "image", src: "Picture 096.jpg" },
            { type: "image", src: "Picture 097.jpg" },
            { type: "image", src: "Picture 098.jpg" }
        ],
        "Snuggles the seal": [
            { type: "image", src: "dia01.jpg" },
            { type: "image", src: "dia02.jpg" },
            { type: "image", src: "dia03.jpg" },
            { type: "image", src: "dia04.jpg" },
            { type: "image", src: "snuggles the seal.jpg" }
        ],
        "The rabbi's cat": [
            { type: "image", src: "img001.jpg" },
            { type: "image", src: "img002.jpg" },
            { type: "image", src: "img003.jpg" },
            { type: "image", src: "img004.jpg" },
            { type: "image", src: "img005.jpg" },
            { type: "image", src: "img006.jpg" }
        ],
        "The tail of peter rabbit": [
            { type: "image", src: "the tail of peter rabbit_01.jpg" },
            { type: "image", src: "the tail of peter rabbit_02.jpg" }
        ],
        "The way things work": [
            { type: "image", src: "img017.jpg" },
            { type: "image", src: "the way things work.jpg" }
        ],
        "storyboard": [
            { type: "image", src: "Picture 021.jpg" },
            { type: "image", src: "Picture 026.jpg" },
            { type: "image", src: "Picture 123.jpg" },
            { type: "image", src: "Picture 124.jpg" },
            { type: "image", src: "Picture 125.jpg" },
            { type: "image", src: "Picture 126.jpg" },
            { type: "image", src: "Picture 128.jpg" },
            { type: "image", src: "Picture 129.jpg" },
            { type: "image", src: "Picture 130.jpg" },
            { type: "image", src: "Picture 131.jpg" },
            { type: "image", src: "Picture 132.jpg" },
            { type: "image", src: "Picture 133.jpg" },
            { type: "image", src: "Picture 134.jpg" },
            { type: "image", src: "Picture 135.jpg" },
            { type: "image", src: "Picture 136.jpg" },
            { type: "image", src: "Picture 137.jpg" },
            { type: "image", src: "Picture 138.jpg" },
            { type: "image", src: "Picture 139.jpg" },
            { type: "image", src: "Picture 140.jpg" },
            { type: "image", src: "Picture 141.jpg" },
            { type: "image", src: "Picture 142.jpg" },
            { type: "image", src: "Picture 143.jpg" },
            { type: "image", src: "Picture 144.jpg" },
            { type: "image", src: "Picture 145.jpg" },
            { type: "image", src: "Picture 146.jpg" },
            { type: "image", src: "Picture 147.jpg" },
            { type: "image", src: "Picture 148.jpg" },
            { type: "image", src: "Picture 149.jpg" },
            { type: "image", src: "Picture 150.jpg" },
            { type: "image", src: "Picture 163.jpg" },
            { type: "image", src: "Picture 164.jpg" },
            { type: "image", src: "Picture 165.jpg" },
            { type: "image", src: "Picture 166.jpg" },
            { type: "image", src: "Picture 167.jpg" },
            { type: "image", src: "Picture 168.jpg" },
            { type: "image", src: "Picture 169.jpg" },
            { type: "image", src: "Picture 170.jpg" },
            { type: "image", src: "Picture 171.jpg" },
            { type: "image", src: "Picture 172.jpg" },
            { type: "image", src: "Picture 173.jpg" },
            { type: "image", src: "Picture 174.jpg" },
            { type: "image", src: "Picture 175.jpg" },
            { type: "image", src: "Picture 176.jpg" },
            { type: "image", src: "Picture 177.jpg" },
            { type: "image", src: "Picture 178.jpg" },
            { type: "image", src: "Picture 179.jpg" },
            { type: "image", src: "Picture 180.jpg" },
            { type: "image", src: "Picture 181.jpg" }
        ],
        "traditional animation": [
            { type: "image", src: "Picture 017.jpg" },
            { type: "image", src: "Picture 018.jpg" },
            { type: "image", src: "Picture 024.jpg" },
            { type: "image", src: "Picture 025.jpg" },
            { type: "image", src: "Picture 031.jpg" },
            { type: "image", src: "Picture 057.jpg" },
            { type: "image", src: "Picture 058.jpg" },
            { type: "image", src: "Picture 060.jpg" },
            { type: "image", src: "Picture 061.jpg" },
            { type: "image", src: "Picture 067.jpg" },
            { type: "image", src: "Picture 069.jpg" },
            { type: "image", src: "Picture 071.jpg" },
            { type: "image", src: "Picture 072.jpg" },
            { type: "image", src: "Picture 073.jpg" },
            { type: "image", src: "Picture 075.jpg" },
            { type: "image", src: "Picture 078.jpg" },
            { type: "image", src: "Picture 079.jpg" },
            { type: "image", src: "Picture 087.jpg" },
            { type: "image", src: "Picture 089.jpg" },
            { type: "image", src: "Picture 090.jpg" },
            { type: "image", src: "Picture 091.jpg" },
            { type: "image", src: "Picture 092.jpg" },
            { type: "image", src: "Picture 093.jpg" },
            { type: "image", src: "Picture 094.jpg" },
            { type: "image", src: "Picture 095.jpg" }
        ],
        "3d animation": [
            { type: "image", src: "Picture 050.jpg" },
            { type: "image", src: "Picture 051.jpg" },
            { type: "image", src: "Picture 052.jpg" },
            { type: "image", src: "Picture 053.jpg" }
        ],
        "styles": [
            { type: "image", src: "black  contour with glass pencil_01.jpg" },
            { type: "image", src: "black  contour with glass pencil_02.jpg" },
            { type: "image", src: "black  contour with glass pencil_03.jpg" },
            { type: "image", src: "colour pencil on paper_01..jpg" },
            { type: "image", src: "colour pencil on paper_02..jpg" },
            { type: "image", src: "colour pencil on paper_03..jpg" },
            { type: "image", src: "colour pencil on paper_04..jpg" },
            { type: "image", src: "colour pencil on paper_05..jpg" },
            { type: "image", src: "colour pencil on paper_06..jpg" },
            { type: "image", src: "colour pencil on paper_07..jpg" },
            { type: "image", src: "colour pencil on paper_08..jpg" },
            { type: "image", src: "colour pencil on paper_09..jpg" },
            { type: "image", src: "colour pencil on paper_10..jpg" },
            { type: "image", src: "colour pencil on paper_11..jpg" },
            { type: "image", src: "colour pencil on paper_12..jpg" },
            { type: "image", src: "colour pencil on paper_13..jpg" },
            { type: "image", src: "colour pencil on paper_14..jpg" },
            { type: "image", src: "colour pencil on paper_15..jpg" },
            { type: "image", src: "colour pencil on paper_16..jpg" },
            { type: "image", src: "colour pencil on paper_17..jpg" },
            { type: "image", src: "colour pencil on paper_18..jpg" },
            { type: "image", src: "colour pencil on paper_19..jpg" },
            { type: "image", src: "colour pencil on paper_20..jpg" },
            { type: "image", src: "colour pencil on paper_21..jpg" },
            { type: "image", src: "colour pencil on paper_22..jpg" },
            { type: "image", src: "colour pencil on paper_23..jpg" },
            { type: "image", src: "colour pencil on paper_24..jpg" },
            { type: "image", src: "colour pencil on paper_25..jpg" },
            { type: "image", src: "colour pencil on paper_26..jpg" },
            { type: "image", src: "colour pencil on paper_27..jpg" },
            { type: "image", src: "colour pencil on paper_28..jpg" },
            { type: "image", src: "colour pencil on paper_29.jpg" },
            { type: "image", src: "glass_pencil._03jpg.jpg" },
            { type: "image", src: "glass_pencil_01.jpg" },
            { type: "image", src: "glass_pencil_02.jpg" },
            { type: "image", src: "glass_pencil_04.jpg" },
            { type: "image", src: "glass_pencil_05.jpg" },
            { type: "image", src: "glass_pencil_06.jpg" },
            { type: "image", src: "oil painting style by colour pencil_01.jpg" },
            { type: "image", src: "oil painting style by colour pencil_02.jpg" },
            { type: "image", src: "oil painting_01.jpg" },
            { type: "image", src: "oil painting_02.jpg" },
            { type: "image", src: "oil painting_03.jpg" },
            { type: "image", src: "oil painting_04.jpg" },
            { type: "image", src: "oil painting_05.jpg" }
        ]
    };

    const cards = document.querySelectorAll(".commercial-card");
    const gridView = document.getElementById("tv-grid-view");
    const galleryView = document.getElementById("gallery-view");
    const galleryTitle = document.getElementById("gallery-main-title");
    const galleryCounter = document.getElementById("gallery-counter");
    const galleryThumbnails = document.getElementById("gallery-thumbnails");
    const galleryPrevBtn = document.getElementById("gallery-prev");
    const galleryNextBtn = document.getElementById("gallery-next");
    const galleryBackBtn = document.getElementById("gallery-view-back");

    // Dynamic base-path retrieval
    const designGrid = document.querySelector(".design-grid");
    const basePath = designGrid ? (designGrid.getAttribute("data-base-path") || "tv-series/tv-design") : "tv-series/tv-design";

    let currentFolder = "";
    let currentImages = [];
    let currentIndex = 0;

    // 1. Initialize random card background cover on page load (from image type items only)
    cards.forEach(card => {
        const folder = card.getAttribute("data-folder");
        const items = categoryData[folder];
        if (items && items.length > 0) {
            const imageItems = items.filter(item => item.type === "image");
            if (imageItems.length > 0) {
                const randomImage = imageItems[Math.floor(Math.random() * imageItems.length)].src;
                const bgDiv = card.querySelector(".card-bg");
                if (bgDiv) {
                    bgDiv.style.backgroundImage = `url("${basePath}/${encodeURIComponent(folder)}/${randomImage}")`;
                }
            }
        }
    });

    // 2. Open Gallery
    function openGallery(folder, titleHu, titleEn) {
        currentFolder = folder;
        currentImages = categoryData[folder] || [];
        currentIndex = 0;

        if (currentImages.length === 0) return;

        // Set Title
        const isHu = (localStorage.getItem("site-lang") || "hu") === "hu";
        galleryTitle.setAttribute("data-hu", titleHu);
        galleryTitle.setAttribute("data-en", titleEn);
        galleryTitle.textContent = isHu ? titleHu : titleEn;

        // Show Gallery View, Hide Grid
        if (gridView) gridView.classList.add("hidden");
        if (galleryView) galleryView.classList.remove("hidden");

        updateGalleryImage();
        generateThumbnails();

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 3. Update active image or video view, counter, and thumbnail states
    function updateGalleryImage() {
        if (currentIndex < 0) currentIndex = currentImages.length - 1;
        if (currentIndex >= currentImages.length) currentIndex = 0;

        const item = currentImages[currentIndex];
        const wrapper = document.querySelector(".gallery-image-wrapper");
        wrapper.innerHTML = ""; // Clear current image/video container

        if (item.type === "video") {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${item.src}?autoplay=1`;
            iframe.title = "YouTube video player";
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
            iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            iframe.setAttribute("allowfullscreen", "");
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.borderRadius = "6px";
            iframe.style.border = "0";
            wrapper.appendChild(iframe);
        } else {
            const img = document.createElement("img");
            img.id = "gallery-active-img";
            img.src = `${basePath}/${encodeURIComponent(currentFolder)}/${item.src}`;
            img.alt = "Active Gallery Image";
            wrapper.appendChild(img);
        }
        
        // Counter text
        galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

        // Update active class on thumbnails and center scroll
        const thumbs = galleryThumbnails.querySelectorAll(".gallery-thumb");
        thumbs.forEach((thumb, idx) => {
            if (idx === currentIndex) {
                thumb.classList.add("active");
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove("active");
            }
        });
    }

    // 4. Generate bottom list of clickable thumbnails (supports video thumbnails)
    function generateThumbnails() {
        galleryThumbnails.innerHTML = "";
        currentImages.forEach((item, idx) => {
            const thumb = document.createElement("div");
            thumb.className = "gallery-thumb";
            if (item.type === "video") {
                thumb.classList.add("video-thumb");
            }
            if (idx === currentIndex) thumb.classList.add("active");

            const img = document.createElement("img");
            if (item.type === "video") {
                img.src = `https://img.youtube.com/vi/${item.src}/mqdefault.jpg`;
            } else {
                img.src = `${basePath}/${encodeURIComponent(currentFolder)}/${item.src}`;
            }
            img.alt = `Thumbnail ${idx + 1}`;
            
            thumb.appendChild(img);
            
            thumb.addEventListener("click", () => {
                currentIndex = idx;
                updateGalleryImage();
            });

            galleryThumbnails.appendChild(thumb);
        });
    }

    // 5. Close Gallery View and return to Grid View
    function closeGallery() {
        // Clear viewport to stop any playing videos
        const wrapper = document.querySelector(".gallery-image-wrapper");
        if (wrapper) wrapper.innerHTML = "";

        if (galleryView) galleryView.classList.add("hidden");
        if (gridView) gridView.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 6. Connect Card Clicks
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const folder = card.getAttribute("data-folder");
            const titleEl = card.querySelector(".card-title");
            const titleHu = titleEl ? titleEl.getAttribute("data-hu") : "";
            const titleEn = titleEl ? titleEl.getAttribute("data-en") : "";
            openGallery(folder, titleHu, titleEn);
        });
    });

    // 7. Navigation Event Listeners
    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener("click", () => {
            currentIndex--;
            updateGalleryImage();
        });
    }

    if (galleryNextBtn) {
        galleryNextBtn.addEventListener("click", () => {
            currentIndex++;
            updateGalleryImage();
        });
    }

    if (galleryBackBtn) {
        galleryBackBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closeGallery();
        });
    }

    // 8. Keyboard navigation support (ArrowLeft, ArrowRight, Escape)
    document.addEventListener("keydown", (e) => {
        if (galleryView && !galleryView.classList.contains("hidden")) {
            if (e.key === "Escape") {
                closeGallery();
            } else if (e.key === "ArrowLeft") {
                currentIndex--;
                updateGalleryImage();
            } else if (e.key === "ArrowRight") {
                currentIndex++;
                updateGalleryImage();
            }
        }
    });
});
