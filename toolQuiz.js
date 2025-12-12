// ===== Utility helpers =====
function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickRandomDistinct(source, count, exclude) {
  const result = [];
  const excludedNames = new Set((exclude || []).map((t) => t.name));
  const pool = source.slice();

  while (result.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    const item = pool.splice(index, 1)[0];
    if (!excludedNames.has(item.name)) {
      result.push(item);
    }
  }
  return result;
}

// ===== DOM elements =====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const modeButtons = document.querySelectorAll(".mode-button");
const timedCheckbox = document.getElementById("timedMode");
const questionCountSelect = document.getElementById("questionCount");
const startGameBtn = document.getElementById("startGameBtn");

const modeLabel = document.getElementById("modeLabel");
const progressLabel = document.getElementById("progressLabel");
const timerEl = document.getElementById("timer");

const questionTextEl = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackEl = document.getElementById("feedback");

const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");

const resultsSummaryEl = document.getElementById("resultsSummary");
const playAgainBtn = document.getElementById("playAgainBtn");
const resultsBackToMenuBtn = document.getElementById("resultsBackToMenuBtn");

// ===== Game state =====
let currentMode = "combined";
let timedMode = false;
let totalQuestions = 10;
let currentIndex = 0;
let score = 0;
let currentQuestion = null;
let timerId = null;
let timeRemaining = 0;

// ===== Mode selection UI =====
modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    modeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
  });
});

// ===== Start game =====
startGameBtn.addEventListener("click", () => {
  timedMode = timedCheckbox.checked;
  totalQuestions = parseInt(questionCountSelect.value, 10) || 10;
  currentIndex = 0;
  score = 0;

  showSection(quizScreen);
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextQuestionBtn.disabled = true;

  updateModeLabel();
  loadNextQuestion();
});

backToMenuBtn.addEventListener("click", () => {
  resetToMenu();
});

playAgainBtn.addEventListener("click", () => {
  // Keep last mode/timed setting, just restart game
  showSection(startScreen);
});

resultsBackToMenuBtn.addEventListener("click", () => {
  resetToMenu();
});

// ===== Core quiz flow =====
nextQuestionBtn.addEventListener("click", () => {
  currentIndex += 1;
  loadNextQuestion();
});

function loadNextQuestion() {
  clearTimer();

  if (currentIndex >= totalQuestions) {
    endGame();
    return;
  }

  const question = generateQuestion(currentMode, currentIndex);
  if (!question) {
    // Tape measure bank missing or similar
    feedbackEl.textContent =
      "No questions are configured for this mode yet.";
    return;
  }
  currentQuestion = question;

  progressLabel.textContent = `Question ${currentIndex + 1} of ${totalQuestions}`;
  renderQuestion(question);

  if (timedMode) {
    startTimer(15); // seconds per question
  } else {
    timerEl.classList.add("hidden");
  }
}

function renderQuestion(question) {
  questionTextEl.textContent = question.prompt;

  // Clear old options
  optionsContainer.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextQuestionBtn.disabled = true;

  question.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = optText;
    btn.dataset.index = String(index);
    btn.addEventListener("click", onOptionClick);
    optionsContainer.appendChild(btn);
  });
}

function onOptionClick(event) {
  const selectedIndex = parseInt(event.currentTarget.dataset.index, 10);
  if (currentQuestion == null) return;

  clearTimer();
  lockOptions();

  const buttons = optionsContainer.querySelectorAll(".option-btn");

  buttons.forEach((btn) => {
    const idx = parseInt(btn.dataset.index, 10);
    if (idx === currentQuestion.correctIndex) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === currentQuestion.correctIndex) {
    score += 1;
    feedbackEl.textContent = "Correct.";
    feedbackEl.classList.add("correct");
  } else {
    feedbackEl.textContent = `Incorrect. Correct answer: ${
      currentQuestion.options[currentQuestion.correctIndex]
    }`;
    feedbackEl.classList.add("incorrect");

    const selectedBtn = buttons[selectedIndex];
    if (selectedBtn) {
      selectedBtn.classList.add("incorrect");
    }
  }

  nextQuestionBtn.disabled = false;
}

function lockOptions() {
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((btn) => {
    btn.classList.add("disabled");
  });
}

// ===== Timer =====
function startTimer(seconds) {
  timeRemaining = seconds;
  timerEl.classList.remove("hidden");
  timerEl.textContent = `Time: ${timeRemaining}s`;

  timerId = window.setInterval(() => {
    timeRemaining -= 1;
    if (timeRemaining <= 0) {
      clearTimer();
      timerEl.textContent = "Time: 0s";
      handleTimeUp();
    } else {
      timerEl.textContent = `Time: ${timeRemaining}s`;
    }
  }, 1000);
}

function clearTimer() {
  if (timerId != null) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function handleTimeUp() {
  lockOptions();

  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((btn) => {
    const idx = parseInt(btn.dataset.index, 10);
    if (idx === currentQuestion.correctIndex) {
      btn.classList.add("correct");
    }
  });

  feedbackEl.textContent = `Time is up. Correct answer: ${
    currentQuestion.options[currentQuestion.correctIndex]
  }`;
  feedbackEl.classList.add("incorrect");

  nextQuestionBtn.disabled = false;
}

// ===== Question generators =====
function generateQuestion(mode, index) {
  if (mode === "combined") {
    return generateCombinedQuestion();
  }
  if (mode === "hand") {
    return generateCategoryQuestion("hand");
  }
  if (mode === "power") {
    return generateCategoryQuestion("power");
  }
  if (mode === "tape") {
    return generateTapeQuestion(index);
  }
  return null;
}

// Combined: classify one tool as hand vs power
function generateCombinedQuestion() {
  const tool = pickRandom(TOOL_BANK);
  const isHand = tool.type === "hand";

  return {
    prompt: `Is "${tool.name}" a hand tool or a power tool?`,
    options: ["Hand tool", "Power tool"],
    correctIndex: isHand ? 0 : 1
  };
}

// Hand-only or power-only: pick one correct from the target group,
// three distractors from the other group.
function generateCategoryQuestion(targetType) {
  const targetList = targetType === "hand" ? HAND_TOOLS : POWER_TOOLS;
  const otherList = targetType === "hand" ? POWER_TOOLS : HAND_TOOLS;

  if (targetList.length === 0 || otherList.length === 0) return null;

  const correctTool = pickRandom(targetList);
  const distractors = pickRandomDistinct(otherList, 3, [correctTool]);
  const allOptions = [correctTool, ...distractors];

  // Shuffle options
  for (let i = allOptions.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  const correctIndex = allOptions.findIndex(
    (tool) => tool.name === correctTool.name
  );

  const label =
    targetType === "hand" ? "hand tool" : "power tool";

  return {
    prompt: `Which of these is a ${label}?`,
    options: allOptions.map((t) => t.name),
    correctIndex
  };
}

function generateTapeQuestion(index) {
  if (!Array.isArray(TAPE_MEASURE_QUESTIONS) || TAPE_MEASURE_QUESTIONS.length === 0) {
    return null;
  }
  const q = TAPE_MEASURE_QUESTIONS[index % TAPE_MEASURE_QUESTIONS.length];
  return {
    prompt: q.question,
    options: q.options.slice(),
    correctIndex: q.correctIndex
  };
}

// ===== Results =====
function endGame() {
  clearTimer();
  const percent = Math.round((score / totalQuestions) * 100);

  resultsSummaryEl.textContent =
    `Mode: ${modeName(currentMode)}. ` +
    `Score: ${score} out of ${totalQuestions} (${percent}%).` +
    (timedMode ? " Timed mode was ON." : " Timed mode was OFF.");

  showSection(resultsScreen);
}

function modeName(mode) {
  switch (mode) {
    case "hand":
      return "Hand Tools";
    case "power":
      return "Power Tools";
    case "combined":
      return "Combined Tools";
    case "tape":
      return "Tape Measure";
    default:
      return "";
  }
}

function updateModeLabel() {
  const base = `Mode: ${modeName(currentMode)}`;
  modeLabel.textContent = timedMode ? `${base} (Timed)` : base;
}

// ===== Navigation helpers =====
function showSection(sectionEl) {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");

  sectionEl.classList.remove("hidden");
}

function resetToMenu() {
  clearTimer();
  startScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
}
