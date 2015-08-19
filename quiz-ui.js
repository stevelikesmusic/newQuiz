var QuizUI = {
  nextButton: document.getElementById('next'),
  backButton: document.getElementById('back'),
  //quiz: document.getElementById( 'quiz' ),
  quizContainer: document.getElementById( 'quiz-container' ),
  resetButton: document.getElementById( 'reset' ), 

  displayNext: function() {
    var thanks = "Congratulations! You answered " + quiz.correctAnswers + " questions correctly. <br>Your score is " + quiz.score;
    
    // Determine if quiz is over
    if (quiz.hasEnded()) { 
      this.populateHTML('quiz', thanks)
      this.resetButton.style.display = 'block';
      //this.resetHandler();
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
  
  /*Handlers
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
      QuizUI.displayNext();
    }
  },
  
  backHandler: function() {
    this.backButton.onclick = function(e) {
      e.preventDefault();
      quiz.getLastQuestion();
      QuizUI.displayNext();
      QuizUI.setPreviousAnswer(quiz.getLastGuess());
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
  
  resetHandler: function() {
    var thanks = document.getElementById('thanks');
    this.quizContainer.removeChild(thanks);
    this.resetButton.style.display = 'none';
    this.quiz.style.display = 'block';
    this.nextButton.disabled = true;
    quiz.currentQuestion = 0;
    quiz.score = 0;
    quiz.correctAnswers = 0; 
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
  
  
  
  reset: function() {
    resetButton.onclick(this.resetQuiz);
  },

  

  thanks: function() {
  
  },

  populateHTML: function(id, data) {
    var element = document.getElementById(id);
    element.innerHTML = data;
  }
};