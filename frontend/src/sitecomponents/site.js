import React from 'react'

function site() {
    return (
        <>

            <header>

                <nav>
                    <div className="left">Flight Booking</div>
                    <div className="right"></div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Services</a></li>
                        <li><a href="/">Contact Me</a></li>
                    </ul>
                </nav>
            </header>

            <section className="firstSection">
                <div className="leftSection">
                    This is a Flight Booking ChatBot
                    <div><span className="purple">Air Assist</span></div>
                    <div>and this will help you with flight booking.</div>
                    <div> Bot will ask for details like:</div>
                    <span id="element"></span>
                </div>
            </section>
        </>

    )
}

export default site