import React, { useState, useEffect, useRef } from 'react';
import './Chatbox.css';
import io from 'socket.io-client';
import ChatboxHeader from './ChatboxHeader';
import ChatboxButtons from './ChatboxButtons';
import ChatboxInput from './ChatboxInput';

const socket = io();

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const chatboxRef = useRef(null);
  const lastMessageRef = useRef(null);

  const greetingMessage = {
    info: "Ready for takeoff! 🚀 Before we soar into flight options, why not start with a friendly 'Hi'? Say hello to begin your journey with Air Assist!",
    type: "left",
    name: "Bot"
  };

  useEffect(() => {
    setMessages([greetingMessage]);
  }, []);

  function AddMes(value_info, value_type) {
    var new_mes_right = Create(value_info, value_type, "User");
    setMessages([...messages, new_mes_right]);

    socket.emit('human', value_info)
    socket.on('botmes', (data) => {
      const new_mes = Create(data, "left", "Bot");
      setMessages([...messages, new_mes_right, new_mes]);
    })
  }

  function Create(value_info, value_type, name) {
    const date = new Date();
    const formattedDate = date.toDateString() + ' ' + date.toTimeString().slice(0, 8);

    return {
      info: value_info,
      date: formattedDate,
      type: value_type,
      name: name,
    };

  }

  const toggleChatbox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };


  useEffect(() => {
    const chatbox = chatboxRef.current;

    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }

  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      AddMes(newMessage, "User");
      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      AddMes(newMessage, "User");
      setNewMessage('');
    }
  };

  const handleBookFlight = () => {
    const bookFlightMessage = "If you want to book a flight, Say 'Hi' or 'Hello' to the bot.";
    const newMessage = Create(bookFlightMessage, "Bot", "Air Assist");
    setMessages([...messages, newMessage]);
  };

  const handleCancelFlight = () => {
    const cancelFlightMessage = "If you need assistance with canceling a flight, please go to the help section in your website, there you find the cancel flight option.";
    const newMessage = Create(cancelFlightMessage, "Bot", "Air Assist");
    setMessages([...messages, newMessage]);
  };

  const handleHelp = () => {
    const helpMessage = "If you need any kind of help, please free to go to the help section in your website.";
    const newMessage = Create(helpMessage, "Bot", "Air Assist");
    setMessages([...messages, newMessage]);
  };


  return (
    <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleChatbox}></button>
      {isOpen && (
        <div
          className="chatbox"
          style={{ maxWidth: '500px', minHeight: '300px', maxHeight: '600px', overflowY: 'auto' }}
          ref={chatboxRef}
        >
          <ChatboxHeader toggleChatbox={toggleChatbox} />
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`message-container ${msg.name === 'User' ? 'user-message' : 'bot-message'
                  }`}
              >
                <div className="message">
                  <p>{msg.info}</p>
                  <span className="timestamp">{(msg.date)}</span>
                </div>
              </div>
            ))}
            {messages.length === 1 && messages[0].name === 'Bot' && (
              <ChatboxButtons
                handleBookFlight={handleBookFlight}
                handleCancelFlight={handleCancelFlight}
                handleHelp={handleHelp}
              />
            )}
          </div>
          <ChatboxInput
            handleSendMessage={handleSendMessage}
            handleClearChat={handleClearChat}
            setNewMessage={setNewMessage}
            newMessage={newMessage}
            handleKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div >
  );
};

export default Chatbox;