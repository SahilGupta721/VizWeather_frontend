import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import Navbar from "../components/navbar.jsx";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const winterVideo = "https://res.cloudinary.com/doype8ygx/video/upload/v1741510586/exxaa6aamaq3nkad9lfv.mp4";
const summerVideo ='https://res.cloudinary.com/doype8ygx/video/upload/v1741510614/lhgocyl8ygmvppz9qjzy.mp4';
const rainyVideo ='https://res.cloudinary.com/doype8ygx/video/upload/v1741510595/xkre6mxr58oxz4yazulm.mp4'
import defaultVideo from "../videos/weather1.mp4";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphUrl, setGraphUrl] = useState(""); // Graph URL state
  const [graphLoading, setGraphLoading] = useState(false); // Graph loading state
  const [graphVisible, setGraphVisible] = useState(false); 
  const [backgroundVideo, setBackgroundVideo] = useState(defaultVideo);
  const [themeColor, setThemeColor] = useState("default");

  const navigate = useNavigate();

  // Reset state to default values
  const resetState = () => {
    setCity("");
    setWeather(null);
    setError("");
    setLoading(false);
    setGraphUrl("");
    setGraphLoading(false);
    setGraphVisible(false);
  };

  // Fetch weather data for the entered city
  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);
    setGraphVisible(false);
    setGraphUrl("");

    try {
      const response = await axios.get(`https://viz-ylzs.onrender.com/weather?city=${city}`);// on github I have chnaged the url instead of api i put the backend url of python app that is = https://viz-ylzs.onrender.com
      const data = response.data;

      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  // Fetch hourly forecast graph
  const fetchGraph = async () => {
    if (!city.trim()) return;

    setGraphLoading(true);
    setGraphVisible(false);

    try {
      const response = await axios.get(`https://viz-ylzs.onrender.com/hourly?city=${city}`, { responseType: "blob" });

      if (response.status === 200) {
        const graphUrl = URL.createObjectURL(response.data);
        setGraphUrl(graphUrl);
        setGraphVisible(true); 
        // Navigate to Visualize page with graphUrl as state
        navigate('/visualize', { state: { graphUrl } });
      } else {
        setError("Error fetching graph. Please try again.");
      }
    } catch (err) {
      setError("Network error while fetching graph.");
    }

    setGraphLoading(false);
  };

  // Update the background video and theme color based on weather conditions
  useEffect(() => {
    if (!weather) {
      setBackgroundVideo(defaultVideo);
      setThemeColor("default");
      return;
    }

    let newVideo = defaultVideo;
    let newTheme;

    const temperatureValue = weather.temperature !== undefined && !isNaN(weather.temperature)
      ? parseFloat(weather.temperature)
      : NaN;

    if (isNaN(temperatureValue)) {
      console.error("Invalid temperature value:", weather.temperature);
      return;
    }

    if (temperatureValue < 0) {
      newVideo = winterVideo;
      newTheme = "cold";
    } else if (temperatureValue > 30) {
      newVideo = summerVideo;
      newTheme = "hot";
    } else if (weather.rain !== undefined) {
      const rainValue = parseFloat(weather.rain.match(/[\d\.]+/g)?.[0] || 0);

      if (rainValue > 0) {
        newVideo = rainyVideo;
        newTheme = "rainy";
      }
    }

    if (newVideo !== backgroundVideo) {
      setBackgroundVideo(newVideo);
      setThemeColor(newTheme);
    }
  }, [weather]);

  return (
    <div id="content" className={themeColor}>
      <div id="container">
        <div id="video_home">
          <video key={backgroundVideo} src={backgroundVideo} autoPlay loop muted></video>
        </div>
        <Navbar onHomeClick={resetState} themeColor={themeColor} />
        <div className="pop">
          <div id="outline">
            <div id="header">VizWeather</div>

            <div id="details">
              <div className="weather-info">
                <form id="input_search" onSubmit={fetchWeather}>
                  <SearchIcon className={`search-icon ${themeColor}`} onClick={fetchWeather} />
                  <input
                    id="city_name"
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={loading} // Disable input while loading
                    required
                  />
                </form>
              </div>

              {loading && <p className="loading">Loading...</p>}

              {error && <p className="error">{error}</p>}

              {!loading && weather && (
                <div className="weather-details">
                  <p>Temperature: {weather.temperature} °C</p>
                  <p>Feels Like: {weather.feels_like} °C</p>
                  <p>Humidity: {weather.humidity} %</p>
                  <p>Winds: {weather.winds}</p>
                  <p>Sky Condition: {weather.sky_condition}</p>
                  {weather.rain !== undefined ? <p>{weather.rain}</p> : <p>No rain data available.</p>}
                </div>
              )}

              {graphLoading && <p>Loading graph...</p>}
            </div>
          </div>
        </div>
      </div>
      <section id="visualize_btn">
        <button
          className={`visualize ${themeColor}`}
          onClick={fetchGraph}
          disabled={!city.trim() || loading || !weather || graphLoading || graphUrl}
        >
          Generate Graph
        </button>
      </section>
    </div>
  );
}

export default Home;
