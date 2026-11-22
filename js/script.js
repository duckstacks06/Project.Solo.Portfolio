// plugins
gsap.registerPlugin(ScrollTrigger);

// var declarations
let speedSlowest = 50;
let speedSlow = 20;
let speedFast = 10;

// selecting classes
const sun = document.querySelector(".sun");
const sunButton = document.querySelector(".sun");

const box1 = document.querySelector(".test-box1");
const box2 = document.querySelector(".test-box2");
const text = document.querySelector(".text");

// gsap enter anims
gsap.to(".box-wrapper", {
    y: 200, 
    scrollTrigger: {
        trigger: ".sky", 
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false
    }
});
gsap.fromTo(sun, 
    { scale: 0.1 }, 
    { 
        scale: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.75)",
        onComplete: () => {
            parallax(sun, speedSlowest);
        }
    }
);

// use of functions
parallax(box1, speedFast);
parallax(box2, speedFast);
parallax(text, speedSlowest);

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

// gsap affected by parallax
gsap.to(".test-box1", { 
  scrollTrigger: {
    trigger: ".test-box1",
    start: "20%, 80%",
    end: "80%, 20%",
    markers: true,
    toggleActions: "restart none resume pause"
  },
  y: 0,
  duration: 2
})