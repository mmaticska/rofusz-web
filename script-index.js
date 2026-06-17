document.addEventListener("DOMContentLoaded", () => {
    // List of images in assets/home/valogatas/
    const images = [
        "assets/home/valogatas/A Légy-kép.jpg",
        "assets/home/valogatas/A légy-035.jpg",
        "assets/home/valogatas/RofuszIntro_00001.jpg",
        "assets/home/valogatas/RofuszIntro_00003.jpg",
        "assets/home/valogatas/RofuszIntro_00005.jpg",
        "assets/home/valogatas/RofuszIntro_00006.jpg",
        "assets/home/valogatas/RofuszIntro_00007.jpg",
        "assets/home/valogatas/RofuszIntro_00008.jpg",
        "assets/home/valogatas/RofuszIntro_00009.jpg",
        "assets/home/valogatas/RofuszIntro_00010.jpg",
        "assets/home/valogatas/RofuszIntro_00011.jpg",
        "assets/home/valogatas/RofuszIntro_00012.jpg",
        "assets/home/valogatas/RofuszIntro_00013.jpg",
        "assets/home/valogatas/RofuszIntro_00014.jpg",
        "assets/home/valogatas/RofuszIntro_00015.jpg",
        "assets/home/valogatas/RofuszIntro_00016.jpg",
        "assets/home/valogatas/RofuszIntro_00017.jpg",
        "assets/home/valogatas/RofuszIntro_00018.jpg",
        "assets/home/valogatas/RofuszIntro_00019.jpg",
        "assets/home/valogatas/RofuszIntro_00020.jpg",
        "assets/home/valogatas/UV_210305.jpg",
        "assets/home/valogatas/colour pencil on paper_27..jpg",
        "assets/home/valogatas/colour pencil on paper_28..jpg",
        "assets/home/valogatas/dia05.jpg",
        "assets/home/valogatas/dia08.jpg"
    ];

    let shuffledImages = [];
    let currentIndex = 0;
    let isFirstCycle = true;

    // Helper to shuffle the image array
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Get the next image in the shuffled cycle
    function getNextImage() {
        if (shuffledImages.length === 0 || currentIndex >= shuffledImages.length) {
            shuffledImages = shuffleArray(images);
            currentIndex = 0;

            if (isFirstCycle) {
                const firstImgName = "assets/home/valogatas/A Légy-kép.jpg";
                const firstIdx = shuffledImages.indexOf(firstImgName);
                if (firstIdx !== -1 && firstIdx !== 0) {
                    // Swap target image to the first position
                    [shuffledImages[0], shuffledImages[firstIdx]] = [shuffledImages[firstIdx], shuffledImages[0]];
                }
                isFirstCycle = false;
            }
        }
        const img = shuffledImages[currentIndex];
        currentIndex++;
        return img;
    }

    // Dynamically build the slideshow DOM structure to keep index.html clean
    const bgContainer = document.createElement("div");
    bgContainer.className = "slideshow-bg";

    const slide1 = document.createElement("div");
    slide1.className = "slide active";

    const slide2 = document.createElement("div");
    slide2.className = "slide";

    const overlay = document.createElement("div");
    overlay.className = "slideshow-overlay";

    bgContainer.appendChild(slide1);
    bgContainer.appendChild(slide2);
    bgContainer.appendChild(overlay);
    document.body.insertBefore(bgContainer, document.body.firstChild);

    let activeSlide = slide1;
    let inactiveSlide = slide2;

    // Set first image immediately
    const firstImg = getNextImage();
    activeSlide.style.backgroundImage = `url("${encodeURI(firstImg)}")`;

    // Cross-fade to next random image
    function changeBackground() {
        const nextImg = getNextImage();
        
        // Preload image to avoid visual glitches or white flashes during transition
        const tempImg = new Image();
        tempImg.src = nextImg;
        tempImg.onload = () => {
            inactiveSlide.style.backgroundImage = `url("${encodeURI(nextImg)}")`;
            inactiveSlide.classList.add("active");
            activeSlide.classList.remove("active");

            // Swap active slide references
            const temp = activeSlide;
            activeSlide = inactiveSlide;
            inactiveSlide = temp;
        };
    }

    // Transition background every 7 seconds (7000 milliseconds)
    setInterval(changeBackground, 7000);

    // Typewriter effect for brand title
    const firstNameSpan = document.querySelector(".first-name");
    const lastNameSpan = document.querySelector(".last-name");

    if (firstNameSpan && lastNameSpan) {
        const firstNameText = "FERENC";
        const lastNameText = "ROFUSZ.";

        // Clear fallback text to initiate typewriter
        firstNameSpan.textContent = "";
        lastNameSpan.textContent = "";

        let charIndex = 0;
        const typingSpeed = 150; // Milliseconds per character

        function typeFirst() {
            firstNameSpan.classList.add("typing");
            if (charIndex < firstNameText.length) {
                firstNameSpan.textContent += firstNameText[charIndex];
                charIndex++;
                setTimeout(typeFirst, typingSpeed);
            } else {
                firstNameSpan.classList.remove("typing");
                charIndex = 0;
                // Subtle pause before beginning the last name
                setTimeout(typeLast, 300);
            }
        }

        function typeLast() {
            lastNameSpan.classList.add("typing");
            if (charIndex < lastNameText.length) {
                lastNameSpan.textContent += lastNameText[charIndex];
                charIndex++;
                setTimeout(typeLast, typingSpeed);
            } else {
                // Keep the cursor blinking at the end for 2 seconds before fading out
                setTimeout(() => {
                    lastNameSpan.classList.remove("typing");
                }, 2000);
            }
        }

        // Start typing after a short delay to allow page transition to settle
        setTimeout(typeFirst, 600);
    }
});

