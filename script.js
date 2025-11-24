let gamepadInfo = document.getElementById('gamepad-info');
let buttonsDiv = document.getElementById('buttons');

const buttonNames = [
    'A', 'B', 'X', 'Y', 'LB', 'RB', 'Back', 'Start', 
    'LS Button', 'RS Button', 'D-Pad Up', 'D-Pad Down', 
    'D-Pad Left', 'D-Pad Right'
];

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
        buttonsDiv.innerHTML = ''; // Clear previous buttons

        gamepad.buttons.forEach((button, index) => {
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('button');
            buttonDiv.textContent = buttonNames[index] || `Button ${index}`;

            if (button.pressed) {
                buttonDiv.classList.add('active');
            }

            buttonsDiv.appendChild(buttonDiv);
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
    buttonsDiv.innerHTML = '';
});
