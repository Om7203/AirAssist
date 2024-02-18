import React from 'react';

export default function Footer() {
    return (
        <footer style={footerStyle}>
            <div style={contentStyle}>
                <p>&copy; 2023 Dash Group. All rights reserved.</p>
                <p><a href="/privacy">Privacy Policy</a> | <a href="/contact">Contact Us</a></p>
            </div>
        </footer>
    );
}

const footerStyle = {
    backgroundColor: 'rgb',
    padding: '20px',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
    position: 'flex',

};

const contentStyle = {
    maxWidth: '800px',
    margin: '0 auto',
};