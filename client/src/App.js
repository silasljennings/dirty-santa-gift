import React, { Component } from 'react';
import './App.css';
import ImageComponent from "./components/ImageComponent";
import Navbar from "./components/Navbar";
import TimerComponent from "./components/TimerComponent";

class App extends Component {
  render() {

      const storeOpening = new Date('November 1, 2025 00:00:00');
      const christmasDate = new Date('December 25, 2025 00:00:00');

    return (
        <div className="App">
            <Navbar/>
            <div
                className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-6 sm:flex-row flex-col">
                <TimerComponent title="Countdown to Store Launch" targetDate={storeOpening}/>
                <TimerComponent title="Countdown to Christmas" targetDate={christmasDate}/>
            </div>

            <ImageComponent/>
        </div>
    );
  }
}

export default App;
