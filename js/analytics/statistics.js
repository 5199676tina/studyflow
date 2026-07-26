const completedTasksEl = document.getElementById("completedTasks");
const todayFocusTimeEl = document.getElementById("todayFocusTime");
const weeklyFocusTimeEl = document.getElementById("weeklyFocusTime");

const tasks = loadData("tasks");
const focusSessions = loadData("focusSessions");

// 完成任務數
if (completedTasksEl) {
  const completedCount = tasks.filter((task) => task.completed).length;
  completedTasksEl.textContent = completedCount;
}

function getDateString(date) {
  return date.toISOString().slice(0, 10);
}

// 取得本週週一 00:00 的時間，作為「本週」的起算點
function getStartOfWeek() {
  const now = new Date();
  const day = now.getDay(); // 0 = 週日, 1 = 週一 ... 6 = 週六
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// 今日學習時間
if (todayFocusTimeEl) {
  const todayStr = getDateString(new Date());
  const todayMinutes = focusSessions
    .filter((session) => session.date === todayStr)
    .reduce((sum, session) => sum + session.minutes, 0);

  todayFocusTimeEl.textContent = `${todayMinutes} 分鐘`;
}

// 本週學習時間
if (weeklyFocusTimeEl) {
  const startOfWeek = getStartOfWeek();
  const weeklyMinutes = focusSessions
    .filter((session) => new Date(session.date) >= startOfWeek)
    .reduce((sum, session) => sum + session.minutes, 0);

  weeklyFocusTimeEl.textContent = `${weeklyMinutes} 分鐘`;
}
