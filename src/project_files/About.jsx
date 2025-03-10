const winter ='https://res.cloudinary.com/doype8ygx/video/upload/v1741510586/exxaa6aamaq3nkad9lfv.mp4';

import Navbar from '../components/navbar.jsx';
import '../css/About.css'
function About() {
    
    return (
        <div id="about_content">
            <div id='container_about'><div id="video_about">
                <video src={winter} autoPlay loop muted />

            </div>
                <Navbar />
            </div>
            <section id="about">VizWeather provides real-time weather details, interactive analytics graphs, and dynamic visuals. It offers instant updates on temperature, humidity, wind speed, and sky conditions for any city. The app’s real-time graphs help visualize weather trends, while the background adapts dynamically based on temperature, creating an immersive experience. Stay informed and explore weather data like never before!</section>
        </div>
    );
}
export default About;
