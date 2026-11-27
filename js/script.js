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

// gsap anims
gsap.fromTo(".box-wrapper", 
  {
    y: 50,
    scale: 0.8,
  },
  { 
    y: 0,
    scale: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".surface", // Starts when the surface section enters view
      start: "20%, 80%",
      end: "80%, 20%",
      markers: true,
      toggleActions: "restart pause resume pause"
    }
  }
);
gsap.fromTo(".text", 
  {
    y: 50,
    scale: 0.8,
  },
  { 
    y: 0,
    scale: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".surface", // Starts when the surface section enters view
      start: "20%, 80%",
      end: "80%, 20%",
      markers: true,
      toggleActions: "restart pause resume pause"
    }
  }
);


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
  console.log(`Click count: ${event}`);
});

