// plugins
gsap.registerPlugin(ScrollTrigger);

// var declarations
let speedSlowest = 50;
let speedSlow = 20;
let speedFast = 10;

// use of functions
const box1 = document.querySelector(".test-box1");
parallax(box1, speedFast);
const box2 = document.querySelector(".test-box2");
parallax(box2, speedFast);
const text = document.querySelector(".text");
parallax(text, speedSlowest);

const sun = document.querySelector(".sun");
const sunButton = document.querySelector(".sun");
parallax(sun, speedSlowest);

// functions
function parallax(box, speed){
    document.addEventListener("mousemove", (event) => {
        const x = (innerWidth / 2 - event.clientX) / speed;
        const y = (innerHeight / 2 - event.clientY) / speed;  
        
        
        gsap.to(box, {
            x: x,
            y: y,
            duration: 0.3,
            overwrite: "auto" 
        });
    });
}

sunButton.addEventListener("click", (event) => {
  console.log(`Click count: ${event}`);
});

// gsap
gsap.to(".test-box1", { 
  scrollTrigger: {
    trigger: ".test-box1",
    start: "20%, 80%",
    end: "80%, 20%",
    markers: true,
    toggleActions: "restart none resume pause"
  },
  x: -200,
  rotation: 180,
  duration: 1
})