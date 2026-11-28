// plugins
gsap.registerPlugin(ScrollTrigger);

// creating scroll trigger pins
ScrollTrigger.create({
    trigger: ".sky",
    start: "top top",     
    end: "bottom top",      
    pin: true,          
    pinSpacing: false,
    anticipatePin: 1,      
    markers: true          
});
ScrollTrigger.create({
    trigger: ".surface",
    start: "top top",     
    end: "bottom top",      
    pin: true,          
    pinSpacing: false,
    anticipatePin: 1,      
    markers: true          
});

// selecting classes
const parallaxLayers = document.querySelectorAll("[data-speed]");
const revealElements = document.querySelectorAll("[data-reveal]");

const sun = document.querySelector(".sun");
const sunButton = document.querySelector(".sun");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

// gsap anims
revealElements.forEach((element) => {
    // Dynamically find the closest parent <section> to act as the ScrollTrigger target
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
                trigger: parentSection, // triggers depending on the parent it's in
                start: "top 80%", 
                end: "bottom 20%",
                markers: true, 
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

// functions
document.addEventListener("mousemove", (event) => {
    // calculate the location of the mouse relative to the center
    const mouseX = innerWidth / 2 - event.clientX;
    const mouseY = innerHeight / 2 - event.clientY;  
    
    // loops through every layer
    parallaxLayers.forEach((layer) => {
        // takes the speed from the html attribute
        const speed = parseFloat(layer.dataset.speed);
        
        // calculates the position of the selected element
        const x = mouseX / speed;
        const y = mouseY / speed;
        
        // gsap smoothens the movement
        gsap.to(layer, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto" 
        });
    });
});

sunButton.addEventListener("click", (event) => {
  console.log(`Click count: ${event.detail}`);
});

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // removes the active attribute
        tabButtons.forEach(btn => btn.classList.remove("active"));
        
        // adds the active attribute to the button pressed
        button.classList.add("active");
        
        // hides all panels by default
        tabPanels.forEach(panel => panel.classList.add("hidden"));
        
        // matches the clicked element to the panel
        const targetTabId = button.dataset.tab;
        const targetPanel = document.getElementById(targetTabId);
        
        // reveals the hidden panel
        targetPanel.classList.remove("hidden");
    });
});
