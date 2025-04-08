import React, { Component } from 'react';
import './App.css';
import ImageComponent from "./components/ImageComponent";
import Navbar from "./components/Navbar";
import TimerComponent from "./components/TimerComponent";
import Footer from "./components/footer";

class App extends Component {
    render() {
        const storeOpening = new Date('November 1, 2025 00:00:00');
        const christmasDate = new Date('December 25, 2025 00:00:00');

        return (

            <div>
                {/* Sticky Navbar */}
                <Navbar/>

                <div className=" flex flex-col">

                    {/* Scrollable Main Content */}
                    <main className="relative flex-1 overflow-y-auto">
                        {/* Timers fixed above fold */}
                        <div
                            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-6 sm:flex-row flex-col z-10">
                            <TimerComponent title="Countdown to Store Launch" targetDate={storeOpening}/>
                            <TimerComponent title="Countdown to Christmas" targetDate={christmasDate}/>
                        </div>

                        {/* Background image content */}
                        <ImageComponent/>
                    </main>

                    {/* Footer stays at bottom */}
                    <Footer/>
                </div>
            </div>
                );
                }
                }

                export default App;
