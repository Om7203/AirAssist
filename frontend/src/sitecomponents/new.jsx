import React, { useEffect } from 'react';
import Typed from 'typed.js';

const YourComponent = () => {
    useEffect(() => {
        var typed = new Typed('#element', {
            strings: ['Travel date', 'Travel time', 'Class type', 'Total seats to book', 'Seat number', 'Total adults',
                    'Total childeren', 'Food type', 'Luggage', 'Passanger Name', 'Passport number', 'Mobile number', 'Email-id', 'Payment-option', 'and much more...' ],
            typeSpeed: 50,
        });

        return () => {
    
            typed.destroy();
        };
    }, []);

    return (

 <></> );
};

export default YourComponent;