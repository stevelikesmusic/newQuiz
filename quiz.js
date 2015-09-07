function Quiz(questions) {
  this.questions = questions;
  this.currentQuestion = 0;
  this.correctAnswers = 0;
  this.score = 0; 
  this.guesses = [];
};

Quiz.prototype.getNextQuestion = function () {
  return this.currentQuestion += 1; 
};

Quiz.prototype.getLastQuestion = function() {
  return this.currentQuestion -= 1;
}

Quiz.prototype.guess = function(id, guess) {
  this.currentQuestion += 1; 
  this.addToGuesses(id);
};

// Check answers
Quiz.prototype.checkAnswers = function() {
  var i = 0,
      end = this.guesses.length;
  this.score = 0;
  this.correctAnswers = 0;
  
  for (; i < end; i++) {
    if (this.questions[i].correctAnswer === this.guesses[i].text) {
      this.score += 5;
      this.correctAnswers += 1;
    }
  }
}

Quiz.prototype.hasEnded = function() {
  return this.currentQuestion >= this.questions.length;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestion];
};

Quiz.prototype.addToGuesses = function(id) {
  var guess = {},
      guessText = document.getElementById(id);
  guess.id = id;
  guess.text = guessText.innerHTML;
  
  this.guesses.push(guess);
}

Quiz.prototype.getLastGuess = function() {
  return this.guesses[this.guesses.length - 1].id;
}

// Remove guess object from guesses array
Quiz.prototype.removeGuess = function() {
  this.guesses.pop();
}

