let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const cent = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}:${cent}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  isRunning = true;
  startStopBtn.textContent = 'Pause';
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startStopBtn.textContent = 'Start';
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
  isRunning = false;
  startStopBtn.textContent = 'Start';
}

function recordLap() {
  if (!isRunning) return;
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap: ${lapTime}`;
  lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
  isRunning ? pauseTimer() : startTimer();
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
