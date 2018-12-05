"use strict";

var Alexa = require("alexa-sdk");

var flashcardsDictionary = [
  {
    state: "Andhra Pradesh",
    capital: "Hyderabad"
  },
  {
    state: "Assam",
    capital: "Dispur"
  },
  {
    state: "Arunachal Pradesh",
    capital: "Itanagar"
  },
  {
    state: "Bihar",
    capital: "Patna"
  },
  {
    state: "Chattisgarh",
    capital: "Raipur"
  },
  {
    state: "Jammu&Kashmir",
    capital: "Jammu"
  },
  {
    state: "Himachal Pradesh",
    capital: "Shimla"
  },
  {
    state: "Punjab",
    capital: "Chandigarh"
  },
  {
    state: "Haryana ",
    capital: "Chandigarh"
  },
  {
    state: "Rajasthan ",
    capital: "Jaipur"
  },
  {
    state: "Uttarkhand ",
    capital: "Dehradun"
  },
  {
    state: "Uttar Pradesh",
    capital: "Lucknow"
  },
  {
    state: "Madhya Pradesh",
    capital: "Bhopal"
  },
  {
    state: "Gujarat",
    capital: "Gandhi Nagar"
  },
  {
    state: "Maharashtra",
    capital: "Mumbai"
  },
  {
    state: "Goa",
    capital: "Panaji"
  },
  {
    state: "Gujarat",
    capital: "Gandhi Nagar"
  },
  {
    state: "Karnataka",
    capital: "Bengaluru"
  },
  {
    state: "Kerala",
    capital: "Tiruvananthapuram"
  },

  {
    state: "Tamil Nadu",
    capital: "Chennai"
  },
  {
    state: "Telangana",
    capital: "Hyderabad"
  },
  {
    state: "Odisha",
    capital: "Ranchi"
  },
  {
    state: "West Bengal",
    capital: "Kolkata"
  },
  {
    state: "Sikkim",
    capital: "Gangtok"
  },
  {
    state: "Meghalaya",
    capital: "Shillong"
  },
  {
    state: "Tripura",
    capital: "Agartala"
  },
  {
    state: "Manipur",
    capital: "Imphal"
  },
  {
    state: "Nagaland",
    capital: "Kohima"
  },
  {
    state: "Mizoram",
    capital: "Aizawal"
  },
  {
    state: "Delhi",
    capital: "Delhi"
  },
  {
    state: "Chandigarh",
    capital: "Chandigarh"
  },
  {
    state: "Daman&Diu",
    capital: "Daman"
  },
  {
    state: "Dadra Nagar Haveli",
    capital: "Silvassa"
  },
  {
    state: "Puducherry",
    capital: "Puducherry"
  },
  {
    state: "Andaman and Nicobar",
    capital: "Port Blair"
  },
  {
    state: "Lakshdweep",
    capital: "Kavaratti"
  }
];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {
  
  LaunchRequest: function () {
    if (Object.keys(this.attributes).length === 0) {
      
      this.attributes.flashcards = {
        'numberCorrect': 0,
        'currentFlashcardIndex': 0
      }

      this.response
      .speak('Welcome to State and capital. ' +  AskQuestion(this.attributes))
      .listen(AskQuestion(this.attributes)); 

     

    }else { 
       
      var numberCorrect = this.attributes.flashcards.numberCorrect; 
      var currentFlashcardIndex = this.attributes.flashcards.currentFlashcardIndex;
  
        this.response
          .speak('Welcome back to Flashcards. You\'re on question ' + currentFlashcardIndex +
            ' and have answered ' + numberCorrect + ' correctly. ' +
            AskQuestion(this.attributes))
          .listen(AskQuestion(this.attributes));
  
    }
    
    this.emit(':responseReady');
     
  },

  // User gives an answer
  AnswerIntent: function () {

    var currentFlashcardIndex = this.attributes.flashcards.currentFlashcardIndex;
    var userAnswer = this.event.request.intent.slots.capital.value;
    var capitalAnswer = 'capital' ;
    var correctAnswer = flashcardsDictionary[currentFlashcardIndex][capitalAnswer];
    
    if (userAnswer == correctAnswer){
      this.attributes.flashcards.numberCorrect++;
      var numberCorrect = this.attributes.flashcards.numberCorrect;
      this.attributes.flashcards.currentFlashcardIndex++;
      this.response
        .speak('Nice job! The correct answer is ' + correctAnswer + '. You ' +
        'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH +
        ' questions correct. Here is your next question. ' + AskQuestion(this.attributes))
        .listen(AskQuestion(this.attributes));
    } else {
      var numberCorrect = this.attributes.flashcards.numberCorrect;
      this.attributes.flashcards.currentFlashcardIndex++;
      this.response
        .speak('Sorry, the correct answer is ' + correctAnswer + '. You ' +
        'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' 
          + ' questions correct. Here is your next question. ' + 
          AskQuestion(this.attributes))
        .listen(AskQuestion(this.attributes));
    }

    this.emit(':responseReady');
  },

  // Stop
  "AMAZON.StopIntent": function() {
    this.response.speak("Ok, let's play again soon.");
    this.emit(":responseReady");
  },

  // Cancel
  "AMAZON.CancelIntent": function() {
    this.response.speak("Ok, let's play again soon.");
    this.emit(":responseReady");
  },

  // Save state
  SessionEndedRequest: function() {
    console.log("session ended!");
    this.emit(":saveState", true);
  }
};

// Test my {language} knowledge
var AskQuestion = function(attributes) {
  var currentFlashcardIndex = attributes.flashcards.currentFlashcardIndex;

  if (currentFlashcardIndex >= DECK_LENGTH) {
    return "No questions remaining.";
  } else {
    var currentState = flashcardsDictionary[currentFlashcardIndex].state;
    return "What is the capital of " + currentState + "?";
  }
};

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context, callback);
  alexa.dynamoDBTableName = 'GuessCapital';
  alexa.registerHandlers(handlers);
  alexa.execute();
};
