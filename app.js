var quiz = {}, 
    questions = [{"question": "Who is the President of the United States?", "choices": ["Willam Howard Taft", "Anderson Cooper", "Barack Obama", "Bob Sagat"],"correctAnswer": "Barack Obama"}, {"question": "What is Rhode Island?", "choices": ["The smallest state in the Union", "A road running across New England", "An island in the Atlantic", "The land where Rho's go to die"], "correctAnswer": "The smallest state in the Union"}, {"question": "What's my dog's name?", "choices": ["Fido", "Baxter", "Snoopy", "Snuffleupagus"], "correctAnswer": "Baxter"},{"question": "At what speed can one achieve time travel?", "choices": ["Warp 3", "88 miles an hour", "Time travel is silly", "The terminator didn't drive a Delorian"], "correctAnswer": "88 miles an hour"}];
  
quiz = new Quiz(questions);
QuizUI.displayNext();
