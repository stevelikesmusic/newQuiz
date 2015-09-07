var QuizUI = {
  nextButton: document.getElementById('next'),
  backButton: document.getElementById('back'),
  resetButton: document.getElementById( 'reset' ), 

  displayNext: function() {
    // Determine if quiz is over
    if (quiz.hasEnded()) {
      this.endDisplay();
      this.showReset();
    } else {
      this.displayQuestionHeading();
      this.displayQuestion();
      this.displayChoices();
      this.clearClass('checked');
      this.showBackButton();
      this.nextButton.disabled = true;
    }
  }, 
  
  displayQuestionHeading: function() {
    var heading = 'Question ' + (quiz.currentQuestion + 1);
    this.populateHTML('question-heading', heading)
  },
  
  displayQuestion: function() {
    var question = quiz.questions[quiz.currentQuestion].question;
    this.populateHTML('question', question);
  },
  
  displayChoices: function() {
    var i = 0,
        end = quiz.questions.length,
        choices;
    
    for (i; i < end; i += 1) {
      choices = quiz.getCurrentQuestion().choices;
      this.populateHTML('choice' + i, choices[i]);
      this.guessHandler('choice' + i, choices[i]);
    }
  },
  
  endDisplay: function() {
    var thanks = "Congratulations! You answered " + quiz.correctAnswers + " questions correctly. <br>Your score is " + quiz.score,
        quizBody = document.getElementById('quiz'),
        thanksDisplay = document.getElementById('thanks');
    
    quizBody.style.display = 'none';
    thanksDisplay.style.display = 'block';
    QuizUI.populateHTML('thanks', thanks);
  },
  
  /* Quiz Handlers
  *******************************************/
  guessHandler: function(id, guess) {
    var choice = document.getElementById(id);
    choice.onclick = function(e) {
      QuizUI.addCheckedToAnswer.call(this, 'checked');  
      QuizUI.nextButton.disabled = false;
      QuizUI.submitHandler(id, guess);
    };
  },
  
  submitHandler: function(id, guess) {
    this.nextButton.onclick = function(e) {
      e.preventDefault();
      quiz.guess(id, guess);
      quiz.checkAnswers();
      QuizUI.displayNext();
    }
  },
  
  backHandler: function() {
    this.backButton.onclick = function(e) {
      e.preventDefault();
      quiz.getLastQuestion();
      QuizUI.displayNext();
      QuizUI.setPreviousAnswer(quiz.getLastGuess());
      quiz.removeGuess();
    }
  },
  
  showBackButton: function() {
    if (quiz.currentQuestion) {
      this.backButton.disabled = false;
      this.backHandler();
    } else {
      this.backButton.disabled = true;
    }
  },
  
  /* Checked Class Manipulators
  **********************************************/
  addCheckedToAnswer: function(className) {
    var i = 0;
    var answers = document.getElementsByClassName('answer');
    for (; i < 4; i += 1) {
      answers[i].classList.remove(className);
    }
    this.classList.add(className);
  },
  
  clearClass: function(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length) elements[0].classList.remove(className);
  },
  
  setPreviousAnswer: function(id) {
    var guess = document.getElementById(id);
    guess.classList.add('checked');
  },
  
  
  
/* Resets
  **********************************************/
  
  resetHandler: function() {
    var thanksDisplay = document.getElementById('thanks'),
        quizBody = document.getElementById('quiz');
    
    thanksDisplay.style.display = 'none';
    quizBody.style.display = 'block';
    QuizUI.resetButton.style.display = 'none';
    QuizUI.nextButton.disabled = true;
    quiz.currentQuestion = 0;
    quiz.score = 0;
    quiz.correctAnswers = 0; 
    quiz.guesses = [];
    QuizUI.displayNext();
  },  
  
  showReset: function() {
    this.resetButton.style.display = 'block';
    this.resetButton.onclick = this.resetHandler;
  },
  
  
  /* Helpers
  **********************************************/
  
  populateHTML: function(id, data) {
    var element = document.getElementById(id);
    element.innerHTML = data;
  }
};