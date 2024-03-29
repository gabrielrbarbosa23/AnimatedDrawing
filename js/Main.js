const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');

let size = 5;
let x = undefined;
let y = undefined;
let color = 'black';
let isPressed = false;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBtn.addEventListener('click', () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
    color = e.target.value;
});

clearEl.addEventListener('click', () => {
    doShakeAndClear();
});

function updateSizeOnScreen() {
    sizeEl.innerText = size;
}

function doShakeAndClear() {
    var content = document.getElementById('content');
    content.classList.add('shake');

    setTimeout(function() {
        content.classList.remove('shake');
    }, 500);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var rotated = false;

function doBarrelRoll() {
    var content = document.getElementById('content');

    if (!rotated) {
        content.style.transform = 'rotate(360deg)';
        rotated = true;
    } else {
        content.style.transform = 'rotate(0deg)';
        rotated = false;
    }
}
