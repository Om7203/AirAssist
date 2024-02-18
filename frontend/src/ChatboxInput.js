import React, { useRef } from 'react';

const ChatboxInput = ({ handleSendMessage, handleClearChat, setNewMessage, newMessage, handleKeyDown }) => {

    const inputRef = useRef(null);
    return (
        <div className="input-container">
            <div className="message-input-container">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="circle-shape"></div>
            </div>
            <button className="send-button" onClick={handleSendMessage}>
                <span className="material-icon">send</span>
            </button>
            <button className="clear-button" onClick={handleClearChat}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    );
};

export default ChatboxInput;