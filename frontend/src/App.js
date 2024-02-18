import React from 'react';
import './App.css';
import YourComponent from './sitecomponents/new.jsx';
import Site from './sitecomponents/site.js';
import Chatbox from './Chatbox.js';
import Footer from './Footer.js';



function App() {
  return (
    <>
      <div className="App">
        <Chatbox />
      </div>
      <Site />
      <YourComponent />
      <Footer />
    </>

  );
}

export default App;