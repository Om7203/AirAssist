const express = require('express');
const { Server: Index } = require('socket.io');
const port = process.env.PORT || 5000;
const app = express();
const http = require('http');

const server = http.createServer(app);
app.use(express.static('build'));
const io = new Index(server);

const json = require('./backend.json');

app.use(express.static('build'));

const intents = json.intents;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
let intent = "start";
let flightName = '';
let date = '';
let time = '';
let classtype = '';
let seats = '';
let seatnumber = '';
let total_adults = '';
let total_childeren = '';
let foods = '';
let lugg = '';
let passanger_name = '';
let passport_number = '';
let mobile_number = '';
let email_id = '';
let payment_option = '';
let mistakeCount = 0;


io.on('connection', (socket) => {
  console.log('connected');

  let restartRequested = false;

  socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error);
  });

  socket.on('human', (data) => {
    const input = data.toLowerCase();
    console.log(data);

    if (input.includes('restart')) {
      restartRequested = true;
    }

    if (restartRequested) {
      resetVariables(socket, input);
      processStartIntent(socket, input);
      restartRequested = false;
      return;
    }
    switch (intent) {
      case 'start':
        processStartIntent(socket, input);
        break;
      case 'book':
        book(socket, input);
        break;
      case 'flightname':
        flightname(socket, input);
        break;
      case 'departure':
        departure(socket, input);
        break;
      case 'date':
        validateDate(socket, input);
        break;
      case 'time':
        validateTime(socket, input);
        break;
      case 'class-type':
        class_Selection(socket, input);
        break;
      case 'seats':
        total_seat(socket, input);
        break;
      case 'seat-number':
        seat_number(socket, input);
        break;
      case 'total-adults':
        adults(socket, input);
        break;
      case 'total-children':
        childeren(socket, input);
        break;
      case 'food-services':
        food(socket, input);
        break;
      case 'luggage-service':
        luggage(socket, input);
        break;
      case 'passanger-name':
        validatePassangerName(socket, input);
        break;
      case 'passport-number':
        validatePassportNumber(socket, input);
        break;
      case 'mobile-number':
        mobile(socket, input);
        break;
      case 'email-id':
        email(socket, input);
        break;
      case 'payment-option':
        payment(socket, input);
        break;
      default:
        resetVariables(socket, input);
        processStartIntent(socket, input)
    }
  });

});

function processStartIntent(socket, input) {
  let match = intents[0].keywords.filter((keyword) =>
    input.includes(keyword)
  );

  if (match.length !== 0) {
    intent = "book";
    socket.emit('botmes', intents[0].answers[0]);
  } else {
    //fallback()
  }
}
function book(socket, input) {
  let match = intents[1].keywords.filter((keyword) =>
    input.includes(keyword)
  );

  if (match.length !== 0) {
    intent = "flightname";
    socket.emit('botmes', intents[1].answers[0]);
  } else {
    handleBookFallback(socket, input);
  }
}
function flightname(socket, input) {
  flightName = input;
  intent = "date"
  socket.emit('botmes', intents[2].answers);
  console.log("response from Bot ", intents[2].answers);

}
function departure(socket, input) {
  let match = intents[2].keywords.filter((keyword) =>
    input.includes(keyword)
  );

  if (match.length !== 0) {
    intent = "departure";
    socket.emit('botmes', intents[3].answers[0]);
  } else {
    handleBookFallback(socket, input);
  }
}

function validateDate(socket, input) {
  const currentDate = new Date().toISOString().split('T')[0];
  const selectedDate = input.trim();

  if (selectedDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    if (selectedDate >= currentDate) {
      date = selectedDate;
      intent = 'time';
      socket.emit('botmes', intents[4].answers);
      console.log(date);
      mistakeCount = 0;
    } else {
      socket.emit('botmes', 'Please provide a valid date. Date should not be in the past.');
      handleIncorrectAttempt(socket);
    }
  } else {
    socket.emit('botmes', 'Please provide a valid date in the format YYYY-MM-DD. (eg. 2024-12-07)');
    handleIncorrectAttempt(socket);
  }
}

function validateTime(socket, input) {
  const timeRegex12Hour = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(am|pm)$/i;
  const timeRegex24Hour = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;


  if (input.match(timeRegex12Hour)) {

    const [_, hour, minutes, period] = input.match(timeRegex12Hour);
    const isAM = period.toLowerCase() === 'am';
    const hour24 = isAM ? (hour === '12' ? '00' : hour) : String(Number(hour) + 12);
    time = `${hour24}:${minutes}`;
  } else if (input.match(timeRegex24Hour)) {
    time = input;
  }

  if (time) {
    intent = 'class-type'
    socket.emit('botmes', intents[5].answers);

    console.log(time);
    mistakeCount = 0;

  } else {
    socket.emit('botmes', 'Please provide a valid time in 24-hour format or 12-hour format (e.g., 13:00 or 2:00).');
    handleIncorrectAttempt(socket);
  }
}

function class_Selection(socket, input) {
  let match = intents[5].keywords.filter((keyword) => input.includes(keyword));

  if (match.length !== 0) {
    selectClassType(socket, input);
    mistakeCount = 0;
  } else {
    socket.emit('botmes', 'Understood! What class would you prefer for your flight? (Economy/Business/First).');
    handleIncorrectAttempt(socket);
  }
}

function selectClassType(socket, input) {
  let classType = '';
  let classPrice = 0;

  if (input.includes('economy')) {
    classType = 'economy class';
    classPrice = 400;
  } else if (input.includes('business')) {
    classType = 'business class';
    classPrice = 700;
  } else if (input.includes('first')) {
    classType = 'first class';
    classPrice = 1000;
  }

  if (classType !== '' && classPrice !== 0) {
    classtype = `${classType}: €${classPrice}`;
    intent = 'seats';
    socket.emit('botmes', intents[6].answers[0]);
    console.log(classtype);
    mistakeCount = 0;
  } else {
    socket.emit('botmes', 'Please specify a valid seat type: Economy, Business, or First.');
    handleIncorrectAttempt(socket);
  }
}

function total_seat(socket, input) {
  const seatMatch = input.match(/\d+/);

  if (seatMatch) {
    seats = seatMatch[0];
    intent = 'seat-number';
    socket.emit('botmes', intents[7].answers[0]);
    console.log(seats);
  } else {
    socket.emit('botmes', 'Got it! How many passengers will be traveling?.');
  }
}

function seat_number(socket, input) {
  seatnumber = parseInt(input);

  if (!isNaN(seatnumber)) {
    intent = 'total-adults';
    socket.emit('botmes', intents[8].answers);
    console.log(seatnumber);
  } else {
    socket.emit('botmes', 'Please enter your preferred seat number (eg. 12, 121, 143)');
  }
}

function adults(socket, input) {
  total_adults = parseInt(input);

  if (isNaN(total_adults)) {
    socket.emit('botmes', 'Enter the total number of adults traveling.');
    return;
  }

  intent = 'total-children';
  socket.emit('botmes', intents[9].answers);
  console.log(total_adults);
}
function childeren(socket, input) {
  total_childeren = parseInt(input);
  if (isNaN(total_childeren)) {
    socket.emit('botmes', 'Enter the number of children traveling.');
    return;
  }
  intent = 'food-services'
  socket.emit('botmes', intents[10].answers);
  console.log(total_childeren);
}
function food(socket, input) {
  let match = intents[10].keywords.filter((keyword) => input.includes(keyword));

  if (match.length !== 0) {
    foods = match[0];
    intent = 'luggage-service';
    socket.emit('botmes', intents[11].answers);
    console.log(foods);
    mistakeCount = 0;
  } else {
    socket.emit('botmes', 'Select any meal preference: Veg or Non-veg.');
    handleIncorrectAttempt(socket);
  }
}
function luggage(socket, input) {
  let match = intents[11].keywords.filter((keyword) => input.includes(keyword));

  if (match.length !== 0) {
    lugg = 'luggage allowed upto total 40kg.';
    mistakeCount = 0;
  } else {
    lugg = 'luggage more than 40kg will cost extra ';

  }


  intent = 'passanger-name';
  socket.emit('botmes', intents[12].answers);
  handleIncorrectAttempt(socket);
}

function validatePassangerName(socket, input) {
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameRegex.test(input)) {
    socket.emit('botmes', 'Please enter a valid name (only letters and spaces allowed).');
    return;
  }

  passanger_name = input.trim();
  console.log(passanger_name);
  intent = 'passport-number';
  socket.emit('botmes', intents[13].answers);
}

function validatePassportNumber(socket, input) {
  const passportRegex = /^[A-Za-z0-9]+$/;

  const trimmedInput = input.trim();
  if (!passportRegex.test(trimmedInput) || trimmedInput.length !== 8) {
    socket.emit('botmes', 'Please enter a valid 8-character passport number (letters and numbers allowed eg: Z24GH242).');
    mistakeCount = 0;
    return;
  }

  passport_number = trimmedInput.toUpperCase();
  console.log(passport_number);
  intent = 'mobile-number';
  socket.emit('botmes', intents[14].answers);
  handleIncorrectAttempt(socket);
}

function mobile(socket, input) {
  const numberRegex = /\d+/g;
  const numbers = input.match(numberRegex);

  if (!numbers || numbers.length === 0 || numbers[0].length < 10) {
    socket.emit('botmes', 'Please enter a valid 10 digit mobile number (eg: 2451237890).');
    handleIncorrectAttempt(socket);
    return;
  }
  mobile_number = numbers[0];
  console.log(mobile_number);
  mistakeCount = 0;
  intent = 'email-id';
  socket.emit('botmes', intents[15].answers);
  handleIncorrectAttempt(socket);
}
function email(socket, input) {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(input)) {
    socket.emit('botmes', 'Please enter a valid email address (eg: airassist@gmail.com).');
    handleIncorrectAttempt(socket);
    return;
  }
  email_id = input;
  console.log(email_id);
  mistakeCount = 0,
    intent = 'payment-option';
  socket.emit('botmes', intents[16].answers);
  handleIncorrectAttempt(socket);
}

function payment(socket, input) {
  const match = intents[16].keywords.find(keyword => input.toLowerCase().includes(keyword));

  if (match) {
    payment_option = match;
    const confirmation = `your payment option is ${payment_option}`;
    const seatPrice = 500;
    const totalCost = total_adults * seatPrice + total_childeren * 1.5;

    socket.emit('botmes', confirmation);


    setTimeout(() => {
      intent = 'start';
      socket.emit('botmes', intents[17].answers + `Ticket Details:
      Passanger: ${passanger_name}
      Passport No.: ${passport_number}
      Flight Name: ${flightName}                
      Date: ${date}
      Time: ${time}
      Seats: ${seats}
      Class Type: ${classtype}
      Seat Number: ${seatnumber}
      Food: ${foods}
      luggage Option: ${lugg}
      Total Cost: ${totalCost}€
      Mobile Number: ${mobile_number}
      Email: ${email_id}
      TYPE RESTART TO MAKE IT AGAIN:`);
    }, 1000);

    mistakeCount = 0;

  } else {
    socket.emit('botmes', 'Please select a valid payment option (cash or online).');
    handleIncorrectAttempt(socket);
    return;
  }
}

function resetVariables(socket, input) {

  intent = "start";
  flightName = '';
  date = '';
  time = '';
  classtype = '';
  seats = '';
  seatnumber = '';
  total_adults = '';
  total_childeren = '';
  foods = '';
  lugg = '';
  passanger_name = '';
  passport_number = '';
  mobile_number = '';
  email_id = '';
  payment_option = '';
  mistakeCount = 0;

  socket.emit('botmes', 'Conversation reset. Type "book" to begin a new booking.');

}

function fallback() {
}

function handleBookFallback(socket, input) {
  let yesMatch = intents[0].keywords.filter((keyword) =>
    input.includes(keyword)
  );
  if (yesMatch.length == 0) {
    fallback(socket);
  } else {
    fallback(socket);
  }
}

function handleIncorrectAttempt(socket) {
  mistakeCount++;
  if (mistakeCount >= 5) {
    fallback(socket);
    mistakeCount = 0;
  }
}

function fallback(socket) {
  socket.emit('botmes', "Sorry, I didn't understand your response. Please rephrase it.");
  mistakeCount += 1;

  if (mistakeCount >= 5) {
    socket.emit('botmes', "You've made too many mistakes. Restarting the process.");
    restartBot(socket);
  }
}

function restartBot(socket) {
  intent = "start";
  flightName = '';
  date = '';
  time = '';
  classtype = '';
  seats = '';
  seatnumber = '';
  total_adults = '';
  total_childeren = '';
  foods = '';
  lugg = '';
  passanger_name = '';
  passport_number = '';
  mobile_number = '';
  email_id = '';
  payment_option = '';

  mistakeCount = 0;

  socket.emit('botmes', 'Bot has been restarted. Please start again. Type only Hi or Restart');
}