import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/navbar.jsx';
import "../css/Visualize.css";

const weather_analytics = 'https://res.cloudinary.com/doype8ygx/video/upload/v1741510614/lhgocyl8ygmvppz9qjzy.mp4';

function Visualize() {
  const location = useLocation();
  const navigate = useNavigate();
  const [graphUrl, setGraphUrl] = useState(localStorage.getItem("graphUrl"));

  useEffect(() => {
    // Retrieve graph URL from location state or localStorage
    const storedGraphUrl = localStorage.getItem("graphUrl");

    if (location.state?.graphUrl) {
      setGraphUrl(location.state.graphUrl);
      localStorage.setItem("graphUrl", location.state.graphUrl);
    } else if (storedGraphUrl) {
      setGraphUrl(storedGraphUrl);
    }
  }, [location.state]);

  useEffect(() => {
   
    if (graphUrl) {
      localStorage.setItem("graphUrl", graphUrl);
    }
  }, [graphUrl]); // Ensure graphUrl is saved whenever it changes

  const handleImageError = () => {
    // Redirect to home page if image fails to load
    navigate('/');
  };

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
              <img 
                src={graphUrl} 
                alt="Hourly Forecast Graph" 
                onError={handleImageError}  // Handle image load error
              />
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
