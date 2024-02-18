import React from 'react';

const ChatboxButtons = ({ handleBookFlight, handleCancelFlight, handleHelp }) => (
    <div className="buttons-container">
        <button className="graphical-button" onClick={handleBookFlight}>
            Book Flight
        </button>
        <button className="graphical-button" onClick={handleCancelFlight}>
            Cancel Flight
        </button>
        <button className="graphical-button" onClick={handleHelp}>
            Help
        </button>
    </div>
);

export default ChatboxButtons;