let gamepadInfo = document.getElementById('gamepad-info');
let buttonOverlay = document.getElementById('button-overlay');

const buttonPositions = {
    0: { top: '40%', left: '60%', size: '20px' }, // A
    1: { top: '30%', left: '35%', size: '20px' }, // B
    2: { top: '40%', left: '10%', size: '20px' }, // X
    3: { top: '30%', left: '25%', size: '20px' }, // Y
    // Add more buttons if necessary
};

function createHighlightButton(index) {
    const highlight = document.createElement('div');
    highlight.classList.add('button-highlight');
    highlight.style.top = buttonPositions[index].top;
    highlight.style.left = buttonPositions[index].left;
    highlight.style.width = buttonPositions[index].size;
    highlight.style.height = buttonPositions[index].size;
    buttonOverlay.appendChild(highlight);
    return highlight;
}

let highlights = {};

function update() {
    const gamepads = navigator.getGamepads();
    let gamepad = null;

    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            gamepad = gamepads[i];
            break;
        }
    }

    if (gamepad) {
        gamepadInfo.textContent = `Connected to ${gamepad.id}`;
        buttonOverlay.innerHTML = ''; // Clear previous highlights

        gamepad.buttons.forEach((button, index) => {
            if (button.pressed && buttonPositions[index]) {
                const highlight = createHighlightButton(index);
                highlights[index] = highlight; // Store highlights if needed
            }
        });
    }

    requestAnimationFrame(update);
}

window.addEventListener('gamepadconnected', (event) => {
    console.log(`Gamepad connected: ${event.gamepad.id}`);
    update();
});

window.addEventListener('gamepaddisconnected', (event) => {
    console.log(`Gamepad disconnected: ${event.gamepad.id}`);
    gamepadInfo.textContent = 'No gamepad connected.';
    buttonOverlay.innerHTML = '';
});
