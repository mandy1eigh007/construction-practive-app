(function () {
  const questions = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];

  const questionTextEl = document.getElementById("question-text");
  const optionsContainerEl = document.getElementById("options-container");
  const feedbackEl = document.getElementById("feedback");
  const questionCounterEl = document.getElementById("question-counter");
  const scoreDisplayEl = document.getElementById("score-display");
  const nextButtonEl = document.getElementById("next-button");
  const restartButtonEl = document.getElementById("restart-button");

  let shuffledQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let hasAnswered = false;

  function shuffle(array) {
    return array
      .slice()
      .sort(function () {
        return Math.random() - 0.5;
      });
  }

  function startGame() {
    if (!questions.length) {
      questionTextEl.textContent =
        "No questions available. Check questionData.js.";
      optionsContainerEl.innerHTML = "";
      questionCounterEl.textContent = "";
      scoreDisplayEl.textContent = "";
      nextButtonEl.disabled = true;
      return;
    }

    shuffledQuestions = shuffle(questions);
    currentIndex = 0;
    score = 0;
    hasAnswered = false;
    updateScoreDisplay();
    renderQuestion();
  }

  function updateScoreDisplay() {
    scoreDisplayEl.textContent = "Score: " + score + " correct";
  }

  function updateQuestionCounter() {
    const total = shuffledQuestions.length;
    const number = currentIndex + 1;
    questionCounterEl.textContent = "Question " + number + " of " + total;
  }

  function renderQuestion() {
    const question = shuffledQuestions[currentIndex];
    if (!question) {
      return;
    }

    hasAnswered = false;
    nextButtonEl.disabled = true;
    feedbackEl.textContent = "";

    updateQuestionCounter();

    questionTextEl.textContent = question.text;
    optionsContainerEl.innerHTML = "";

    question.options.forEach(function (optionText, index) {
      const button = document.createElement("button");
      button.className = "option-button";
      button.textContent = optionText;
      button.setAttribute("data-index", String(index));
      button.addEventListener("click", handleOptionClick);
      optionsContainerEl.appendChild(button);
    });

    // Update "Next" button label depending on position
    if (currentIndex === shuffledQuestions.length - 1) {
      nextButtonEl.textContent = "See results";
    } else {
      nextButtonEl.textContent = "Next question";
    }
  }

  function handleOptionClick(event) {
    if (hasAnswered) {
      return;
    }

    const target = event.currentTarget;
    const index = parseInt(target.getAttribute("data-index"), 10);
    const question = shuffledQuestions[currentIndex];

    if (isNaN(index) || !question) {
      return;
    }

    hasAnswered = true;
    nextButtonEl.disabled = false;

    const optionButtons = optionsContainerEl.querySelectorAll(".option-button");
    optionButtons.forEach(function (btn, btnIndex) {
      btn.disabled = true;
      if (btnIndex === question.correctIndex) {
        btn.classList.add("correct");
      }
    });

    if (index === question.correctIndex) {
      score += 1;
      feedbackEl.textContent = "Correct.";
    } else {
      target.classList.add("incorrect");
      const correctText = question.options[question.correctIndex];
      feedbackEl.textContent = "Not quite. Correct answer: " + correctText;
    }

    updateScoreDisplay();
  }

  function handleNextClick() {
    if (!hasAnswered) {
      return;
    }

    if (currentIndex < shuffledQuestions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else {
      // End of game
      questionTextEl.textContent = "Game complete!";
      optionsContainerEl.innerHTML = "";
      feedbackEl.textContent =
        "You answered " +
        score +
        " out of " +
        shuffledQuestions.length +
        " questions correctly.";
      questionCounterEl.textContent = "Done";
      nextButtonEl.disabled = true;
    }
  }

  function handleRestartClick() {
    startGame();
  }

  nextButtonEl.addEventListener("click", handleNextClick);
  restartButtonEl.addEventListener("click", handleRestartClick);

  // Initialize on first load
  startGame();
})();

