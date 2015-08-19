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
  this.score -= 5;
  return this.currentQuestion -= 1;
}

Quiz.prototype.guess = function(id, guess) {
  var answer = this.getCurrentQuestion().correctAnswer;
  if (answer === guess) {
    this.score += 5;
    this.correctAnswers += 1;
  }
  this.currentQuestion += 1;
  this.addToGuesses(id);
};

Quiz.prototype.hasEnded = function() {
  return this.currentQuestion >= this.questions.length;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestion];
};

Quiz.prototype.addToGuesses = function(id) {
  this.guesses.push(id);
}

Quiz.prototype.getLastGuess = function() {
  return this.guesses[this.guesses.length - 1];
}

Quiz.prototype.removeGuess = function() {
  //this.guesses.pop();
}

