//Multiple presses of the "set alarm" button will
//all reset and set this singleton interval.
let timerInterval;

//Sets and starts the alarm countdown,
//based on a value it finds in the DOM
function setAlarm(audio) {
  clearTimer();
  const inputStr = document.getElementById("alarmSet").value;
  let timeRemaining = Number(inputStr) + 1;

  //A function to call once every second when the timer is running
  //Note: Both `timeRemaining` and `audio` will be referenced from
  //the surrounding closure. Alternatively, use global variables,
  //or pass them to tick()
  function tick() {
    timeRemaining -= 1;
    updateDisplay(timeRemaining);
    if (timeRemaining <= 0) {
      playAlarm(audio);
      clearTimer();
    }
  }
  timerInterval = setInterval(tick, 1000);
}

//Clear the timer interval, if it has been set.
//It's ok to call this if interval is not set.
function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = undefined;
  }
}

function updateDisplay(secondsRemaining) {
  const padNum = (n) => n.toString().padStart(2, "0");
  const mm = padNum(Math.floor(secondsRemaining / 60));
  const ss = padNum(secondsRemaining % 60);

  const elem = document.getElementById("timeRemaining");
  elem.textContent = `Time Remaining: ${mm}:${ss}`;
}

// DO NOT EDIT BELOW HERE
function setup() {
  var audio = new Audio("alarmsound.mp3");

  document.getElementById("set").addEventListener("click", () => {
    setAlarm(audio);
  });

  document.getElementById("stop").addEventListener("click", () => {
    stopAlarm(audio);
  });
}

function playAlarm(audio) {
  audio.play();
}

function stopAlarm(audio) {
  audio.pause();
}

window.onload = setup;
