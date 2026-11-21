const box1 = document.querySelector(".test-box1");
const box2 = document.querySelector(".test-box2");
const text = document.querySelector(".text");

let speedSlowest = 50;
let speedSlow = 20;
let speedFast = 10;

parallax(box1, speedSlow);
parallax(box2, speedFast);
parallax(text, speedSlowest);

function parallax(box, speed){
    document.addEventListener("mousemove", (event) => {
    const x = (innerWidth / 2 - event.clientX) / speed;
    const y = (innerHeight / 2 - event.clientY) / speed;  
    box.style.transform = `translate(${x}px, ${y}px)`
    });
}