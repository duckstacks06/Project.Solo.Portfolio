// plugins
gsap.registerPlugin(ScrollTrigger);

// var declarations
let speedSlow = 50;
let speedMed = 20;
let speedFast = 10;

// selecting classes
const sun = document.querySelector(".sun");
const sunButton = document.querySelector(".sun");

const box1 = document.querySelector(".test-box1");
const box2 = document.querySelector(".test-box2");
const text = document.querySelector(".text");

// gsap anims
gsap.fromTo(".box-wrapper", 
  {
    y: 25,
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
    y: 25,
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

gsap.fromTo(sun, 
    { scale: 0.1 }, 
    { 
        scale: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.75)",
    }
);

// initializes mouse parallax
parallax(box1, speedSlow);
parallax(box2, speedMed);
parallax(text, speedFast);

parallax(sun, speedMed);

// functions
function parallax(box, speed){
    document.addEventListener("mousemove", (event) => {
        const x = (innerWidth / 2 - event.clientX) / speed;
        const y = (innerHeight / 2 - event.clientY) / speed;  
        
        
        gsap.to(box, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power1.out",
            overwrite: "auto" 
        });
    });
}

sunButton.addEventListener("click", (event) => {
  console.log(`Click count: ${event}`);
});

