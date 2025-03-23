import React from 'react';
import Countdown from 'react-countdown';

const TimerComponent = ({ title, targetDate }) => {

    // Countdown renderer for custom formatting
    const renderer = ({ days, hours, minutes, seconds }) => {
        return (
            <div className="text-white text-lg">
                <p>{days} Days {hours} Hours {minutes} Minutes {seconds} Seconds</p>
            </div>
        );
    };

    return (
        <div
            className="p-6 rounded-lg w-100 text-center border-4 border-solid sm:m-4"
            style={{
                borderColor: 'black',   // Sets the border color
                backgroundColor: 'black', // Sets the background color
                opacity: 0.75,           // Sets the opacity
            }}
        >
            <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
            <Countdown date={targetDate} renderer={renderer} />
        </div>
    );

};

export default TimerComponent;
