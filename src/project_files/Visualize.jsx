import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from '../components/navbar.jsx';
const weather_analytics ='https://res.cloudinary.com/doype8ygx/video/upload/v1741510614/lhgocyl8ygmvppz9qjzy.mp4';
import "../css/Visualize.css"

function Visualize() {
  const location = useLocation();
  const { graphUrl } = location.state || {}; // Retrieve the graph URL passed via state

  return (
    <>
      <div id="content_visualize">
        <div id="video_home">
          <video src={weather_analytics} autoPlay loop muted />
          <Navbar />
        </div>
        

        <div id="visualize-container">

          {graphUrl ? (
            <div id="graph-container">
              <img src={graphUrl} alt="Hourly Forecast Graph" />
            </div>
          ) : (
            <p>No graph available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Visualize;
