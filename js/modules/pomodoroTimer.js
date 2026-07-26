const timerDisplay = document.getElementById("timer");
const modeLabel = document.getElementById("timerMode");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

if (timerDisplay && startBtn && resetBtn) {
  let timer = WORK_DURATION;
  let interval = null;
  let isBreak = false;

  function updateTimerDisplay() {
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");
    timerDisplay.textContent = `${minutes}:${seconds}`;

    if (modeLabel) {
      modeLabel.textContent = isBreak ? "休息時間" : "專注時間";
    }
  }

  // 記錄一段完成的專注時間到 LocalStorage
  function recordFocusSession(minutes) {
    const sessions = loadData("focusSessions");
    sessions.push({
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      minutes,
    });
    saveData("focusSessions", sessions);
  }

  // 專注／休息模式切換
  function switchMode() {
    if (!isBreak) {
      recordFocusSession(WORK_DURATION / 60);
      isBreak = true;
      timer = BREAK_DURATION;
    } else {
      isBreak = false;
      timer = WORK_DURATION;
    }
    updateTimerDisplay();
  }

  startBtn.addEventListener("click", () => {
    if (!interval) {
      interval = setInterval(() => {
        if (timer > 0) {
          timer--;
          updateTimerDisplay();
        } else {
          clearInterval(interval);
          interval = null;
          switchMode();
        }
      }, 1000);
    }
  });

  // 暫停：只停止計時，不歸零，方便中途離開後接著做
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      clearInterval(interval);
      interval = null;
    });
  }

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    isBreak = false;
    timer = WORK_DURATION;
    updateTimerDisplay();
  });

  updateTimerDisplay();
}
