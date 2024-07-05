let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

function formatTime(ms) {
    let milliseconds = Math.floor(ms % 1000 / 100);
    let seconds = Math.floor(ms / 1000 % 60);
    let minutes = Math.floor(ms / (1000 * 60) % 60);
    let hours = Math.floor(ms / (1000 * 60 * 60) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.innerHTML = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 100);
        startStopButton.innerHTML = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    startTime = 0;
    elapsedTime = 0;
    display.innerHTML = '00:00:00.0';
    startStopButton.innerHTML = 'Start';
    isRunning = false;
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.innerHTML = lapTime;
        lapsContainer.appendChild(li);
    }
});
