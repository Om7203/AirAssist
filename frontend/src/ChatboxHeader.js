import React from 'react';

const ChatboxHeader = ({ toggleChatbox }) => (
    <div className="header">
        <h3>🤖 Air Assist</h3>
        <button className="close-button" onClick={toggleChatbox}>
            &#10005;
        </button>
    </div>
);

export default ChatboxHeader;