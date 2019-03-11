

const artistData = {
    "IDOL": "Love Yourself Answer 2018",
    "FAKE LOVE": "Love Yourself: Tear 2018",
    "DNA": "Face Yourself 2018",
    "Fire": "2016",
    "Blood Sweat & Tears": "Wings 2016",
    "MIC Drop": "Face Yourself 2018",
    "Spring Day": "Wings 2016",
    "Save Me": "2016",
    "Go Go": "Love Yourself: Her 2017",
    "I NEED U": "2015",
    "Dope": "The Most Beautiful Moment in Life, Pt. 1 2015",
    "Airplane pt.2": "Love Yourself Tear 2018",
    "Anpanman": "Love Yourself Tear 2018",
    "BOY IN LUV": "Wake Up 2014",
    "The Truth Untold": "Love Yourself Tear 2018",
    "Not Today": "Wings 2016",
    "Magic Shop": "Love Yourself Tear 2018",
    "Don't Leave": "Me Face Yourself 2018",
    "We Are Bulletproof Pt.2": "2 COOL 4 SKOOL 2013",
    "War of Hormone": "Dark & Wild 2014",
    "RUN": "2015",
    "Intro Serendipity": "Love Yourself Her 2017",
    "JUST ONE DAY": "Wake Up 2014",
    "I'm Fine": "2018",
    "Euphoria": "2018",
    "Boyz With Fun": "The Most Beautiful Moment in Life, Pt. 1 2015",
    "Pied Piper Love Yourself": "Her 2017",
    "Silver Spoon": "The Most Beautiful Moment in Life, Part 2 2015",
    "Butterfly": "The Most Beautiful Moment in Life, Part 2 2015",
    "21st Century Girls": "Wings 2016",
    "Save Me / I'm Fine": "Love Yourself Answer 2018",
  }
  
  
  class BTSsongsgame {
    constructor(remainingAttempts = 6) {
      this.started = false; 
      this.answer = "";   
      this.ansLetters = []; 
      this.ansDisplay = []; 
      this.numWins = 0;     
      this.remaining = remainingAttempts; 
    }
  
   
    start(remainingGuess = this.remaining) {
      this.remaining = remainingGuess;
      this.answer = this.pickAnswer(artistData);
      this.ansLetters = this.initAnswerLetters(this.answer);
      this.ansDisplay = this.initAnswerDisplay(this.answer);
      this.started = true;
    }
  
    
    pickAnswer(inputData) {
      let arrayData = [];
      for (let name in inputData) {
        arrayData.push(name);
      }
      let ndx = Math.floor(Math.random() * arrayData.length);
  
      return arrayData[ndx];
    }
  
  
    initAnswerLetters(ansStr) {
      let ansLetters = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr.charAt(i).toLowerCase();
        if (/^\w$/.test(ansChar)) {
          ansLetters.push(ansChar);
        }
      }
  
      return new Set(ansLetters);
    }
  
  
    initAnswerDisplay(ansStr) {
      let ansDisplay = [];
      for (let i = 0; i < ansStr.length; i++) {
        let ansChar = ansStr[i];
        ansDisplay[i] = ansChar;
        if (/\w/.test(ansChar)) {
          ansDisplay[i] = "_";
        }
      }
  
      return ansDisplay;
    }
  
   
    updateGameData(inputChar) {
   
      if (this.ansLetters.delete(inputChar)) {
        this.updateAnsDisplay(inputChar);
        if (this.userWon()) {
          this.numWins++;
          return true;
        }
      } else {
        this.remaining--;
      }
  
      return false;
    }
  
     
    updateAnsDisplay(char) {
      console.log("char: =>" + char + "<- word: " + this.answer);
  
      for (let i = 0; i < this.answer.length; i++) {
        if (this.answer.charAt(i).toLowerCase() === char) {
          this.ansDisplay[i] = this.answer[i];
          console.log("got " + char + "  word: " + this.ansDisplay);
        }
      }
  
      return this.ansDisplay;
    }
  
   
    userWon() {
      if (this.ansLetters.size == 0) {
        return true;
      }
      return false;
    }
  
    
    hint() {
      return artistData[this.answer];
    }
  }
  

  class WebElems {
    constructor(game = new BTSsongsgame()) {
      this.startMsg = document.getElementById("start");
      this.numWins = document.getElementById("num-wins");
      this.answer = document.getElementById("question");
      this.remaining = document.getElementById("remaining-guesses");
      this.guessed = document.getElementById("already-guessed");
      this.game = game;
    }
  
      
    handleKeyInput(userInput) {
      console.log("input: " + userInput);
  
      if (this.game.started) {
        this.startMsg.style.visibility = "hidden";
  
       
        if (/^[\w~!@#$%^&*()_+=,.]$/.test(userInput)) {
          console.log("answer: " + this.game.answer);
          if (this.game.updateGameData(userInput.toLowerCase())) {
            this.start();
            userInput = ""; 
          } else {
            if (this.game.remaining === 0) {
              userInput = "";
            }
          }
          this.updatePage(userInput);
        }
      } else {
      
        if (this.game.remaining === 0) {
          this.startMsg.style.visibility = "hidden";
        }
        this.start();
      }
    }
  
  
    start(remainingGuess = 6) {
      this.game.start(remainingGuess);
      this.guessed.textContent = "";
      this.updatePage("");
      $("#hint").text("");
    }
  
      
    updatePage(inputChar) {
      this.numWins.textContent = this.game.numWins;
      this.answer.textContent = this.game.ansDisplay.join("");
      this.remaining.textContent = this.game.remaining;
      this.guessed.textContent += inputChar.toUpperCase();
  
      if (this.game.remaining === 0) {
        this.showAnswer();
        this.game.started = false;
      }
    }
  
   
    showAnswer() {
      this.answer.textContent = this.game.answer;
      this.startMsg.style.visibility = "visible";
    }
  
   
    hint() {
      return this.game.hint();
    }
  }