// ==========================================================
// 1. PLUGINS & PIN CONFIGURATIONS
// ==========================================================
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".sky",
    start: "top top",     
    end: "bottom top",      
    pin: true,          
    pinSpacing: false,
    anticipatePin: 1,      
    markers: false          
});
ScrollTrigger.create({
    trigger: ".surface",
    start: "top top",     
    end: "bottom top",      
    pin: true,          
    pinSpacing: false,
    anticipatePin: 1,      
    markers: false          
});

// ==========================================================
// 2. ELEMENT SELECTORS
// ==========================================================
const parallaxLayers = document.querySelectorAll("[data-speed]");
const revealElements = document.querySelectorAll("[data-reveal]");

const sun = document.querySelector(".sun");
const sunButton = document.querySelector(".sun");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

// ==========================================================
// 3. CAROUSEL STATE CONFIGURATIONS
// ==========================================================
const videoPlaylists = {
    gaming: ["bYDxZb0wbc0", "U0eDTm9f5xM", "q6FpoFk7X1M", "xfTHRW5aM3k"],  
    essays: ["9831abC4p3k", "khIMDDhyvWk", "psvWJSydGG8", "Dy1_tpiHBSI"], 
    variety: ["L8VFOwF0zCM", "_pTZMcX7424"] 
};

let currentCategory = "gaming";
let activeVideoIndex = 0;

const carouselPlayer = document.getElementById("portfolio-player");
const categoryNavButtons = document.querySelectorAll(".category-btn");
const prevVideoBtn = document.querySelector(".prev-btn");
const nextVideoBtn = document.querySelector(".next-btn");
const txtCurrentIndex = document.getElementById("current-index-txt");
const txtTotalIndex = document.getElementById("total-index-txt");

// ==========================================================
// 4. GSAP TIMELINE REVEALS
// ==========================================================
revealElements.forEach((element) => {
    const parentSection = element.closest("section");

    gsap.fromTo(element, 
        {
            y: 50,
            scale: 0.8,
            opacity: 0
        },
        { 
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "circ.out", 
            scrollTrigger: {
                trigger: parentSection,
                start: "top 80%", 
                end: "bottom 20%",
                markers: false, 
                toggleActions: "restart pause resume pause"
            }
        }
    );
});

gsap.fromTo(".sun", 
    { scale: 0.1 }, 
    { 
        scale: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.75)"
    }
);

// ==========================================================
// 5. UNIFIED MOUSE PARALLAX CONTROLLER
// ==========================================================
document.addEventListener("mousemove", (event) => {
    const mouseX = innerWidth / 2 - event.clientX;
    const mouseY = innerHeight / 2 - event.clientY; // 🌟 FIXED: Repaired your cut-off bracket loop mechanics here
    
    parallaxLayers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed);
        const x = mouseX / speed;
        const y = mouseY / speed;
        
        gsap.to(layer, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto" 
        });
    });
});

// ==========================================================
// 6. CAROUSEL ENGINE RENDERING METHODS
// ==========================================================
function updateCarouselPlayer() {
    if (!carouselPlayer) return;
    const activePlaylist = videoPlaylists[currentCategory];
    const targetVideoId = activePlaylist[activeVideoIndex];
    
    // Updates link frame context
    carouselPlayer.src = "https://youtube.com/embed/" + targetVideoId;
    
    // Updates numeric text counter interfaces
    if (txtCurrentIndex) txtCurrentIndex.textContent = activeVideoIndex + 1;
    if (txtTotalIndex) txtTotalIndex.textContent = activePlaylist.length;
}

// Sub-Category selector switch management triggers
categoryNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
        categoryNavButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        currentCategory = button.dataset.category;
        activeVideoIndex = 0; // Default view jump on playlist swaps
        updateCarouselPlayer();
    });
});

// Carousel button directional listener attachments
nextVideoBtn.addEventListener("click", () => {
    const playlistLength = videoPlaylists[currentCategory].length;
    activeVideoIndex++;
    if (activeVideoIndex >= playlistLength) activeVideoIndex = 0;
    updateCarouselPlayer();
});

prevVideoBtn.addEventListener("click", () => {
    const playlistLength = videoPlaylists[currentCategory].length;
    activeVideoIndex--;
    if (activeVideoIndex < 0) activeVideoIndex = playlistLength - 1;
    updateCarouselPlayer();
});

// ==========================================================
// 7. CORE DOCK TAB INTERFACE TOGGLES
// ==========================================================
tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        tabPanels.forEach(panel => panel.classList.add("hidden"));
        
        const targetTabId = button.dataset.tab;
        const targetPanel = document.getElementById(targetTabId);
        if (targetPanel) targetPanel.classList.remove("hidden");
    });
});

// ==========================================================
// 8. INITIALIZE LOGIC ON WINDOW LOAD
// ==========================================================
if (sunButton) {
    sunButton.addEventListener("click", (event) => {
        console.log(`Click count: ${event.detail}`);
    });
}
updateCarouselPlayer(); // Pre-loads your starting gaming video on viewport initialization!
