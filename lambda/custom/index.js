'use strict';

var Alexa = require('alexa-sdk');

var flashcardsDictionary = [
  {
    state: 'Andhra Pradesh',
    capital: 'Hyderabad'
  },
  {
    state: 'Assam',
    capital: 'Dispur'
    },
    {
        state: 'Arunachal Pradesh',
        capital: 'Itanagar'
      },
      {
        state: 'Bihar',
        capital: 'Patna'
    },
    {
        state: 'Chattisgarh',
        capital: 'Raipur'
    },
    {
        state: 'Jammu&Kashmir',
        capital: 'Jammu'
      },
      {
        state: 'Himachal Pradesh',
        capital: 'Shimla'
      },
      {
        state: 'Punjab',
        capital: 'Chandigarh'
      },
      {
        state: 'Haryana ',
        capital: 'Chandigarh'
      },
      {
        state: 'Rajasthan ',
        capital: 'Jaipur'
      },
      {
        state: 'Uttarkhand ',
        capital: 'Dehradun'
      },
      {
        state: 'Uttar Pradesh',
        capital: 'Lucknow'
      },
      {
        state: 'Madhya Pradesh',
        capital: 'Bhopal'
      },
      {
        state: 'Gujarat',
        capital: 'Gandhi Nagar'
    },
    {
        state: 'Maharashtra',
        capital: 'Mumbai'
    },
    {
        state: 'Goa',
        capital: 'Panaji'
      },
      {
        state: 'Gujarat',
        capital: 'Gandhi Nagar'
      },
      {
        state: 'Karnataka',
        capital: 'Bengaluru'
      },
      {
        state: 'Kerala',
        capital: 'Tiruvananthapuram'
      },

      {
        state: 'Tamil Nadu',
        capital: 'Chennai'
    },
    {
        state: 'Telangana',
        capital: 'Hyderabad'
      },
      {
        state: 'Odisha',
        capital: 'Ranchi'
      },
      {
        state: 'West Bengal',
        capital: 'Kolkata'
      },
      {
        state: 'Sikkim',
        capital: 'Gangtok'
      },
      {
        state: 'Meghalaya',
        capital: 'Shillong'
      },{
        state: 'Tripura',
        capital: 'Agartala'
  },
  {
    state: 'Manipur',
    capital: 'Imphal'
  },
  {
    state: 'Nagaland',
    capital: 'Kohima'
  },{
    state: 'Mizoram',
    capital: 'Aizawal'
  },{
    state: 'Delhi',
    capital: 'Delhi'
  },{
    state: 'Chandigarh',
    capital: 'Chandigarh'
  },{
    state: 'Daman&Diu',
    capital: 'Daman'
  },{
    state: 'Dadra Nagar Haveli',
    capital: 'Silvassa'
  },{
    state: 'Puducherry',
    capital: 'Puducherry'
  },{
    state: 'Andaman and Nicobar',
    capital: 'Port Blair'
  },{
    state: 'Lakshdweep',
    capital: 'Kavaratti'
  }


];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {

  },

  // User gives an answer
  'AnswerIntent': function() {

  },


  // Stop
  'AMAZON.StopIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
    this.response.speak('Ok, let\'s play again soon.');
    this.emit(':responseReady');
  },

  // Save state
  'SessionEndedRequest': function() {
    console.log('session ended!');
    this.emit(':saveState', true);
  }

};

// Test my {language} knowledge
var AskQuestion = function(attributes) {
  var currentFlashcardIndex = attributes.flashcards.currentFlashcardIndex;

  if (currentFlashcardIndex >= DECK_LENGTH) {
    return 'No questions remaining.';
  } else {
    var currentState = flashcardsDictionary[currentFlashcardIndex].state;
    return 'What is the capital of ' + currentState + '?';
  }

};

  exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);

    alexa.registerHandlers(handlers);
    alexa.execute();
  };