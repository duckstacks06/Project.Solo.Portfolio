const box = document.querySelector(".test-box");
let box1X = 0;
let box2X  = 0;

parallax1(box1X, box2X);

function parallax1(x, y){
    document.addEventListener("mousemove", (event) => {
    x = window.innerWidth / 2 - event.clientX / 20;
    y = window.innerHeight / 2 - event.clientY / 20;  
    box.style.transform = `translate(${x}px, ${y}px)`
    });
}