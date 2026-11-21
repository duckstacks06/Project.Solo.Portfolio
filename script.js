const box1 = document.querySelector(".test-box1");
const box2 = document.querySelector(".test-box2");

let speedSlow = 20;
let speedFast = 10;

parallax(box1, speedSlow);
parallax(box2, speedFast);

function parallax(box, speed){
    document.addEventListener("mousemove", (event) => {
    const x = (innerWidth / 2 - event.clientX) / speed;
    const y = (innerWidth / 2 - event.clientY) / speed;  
    box.style.transform = `translate(${x}px, ${y}px)`
    });
}