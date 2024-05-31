import React, { useState, useEffect } from "react";

export const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=02ac7d991d8140b6b28180006240805&q=London&aqi=no"
        );
        const data = await response.json();
        setWeatherData(data);
        setBackgroundImage(getBackgroundImage(data));
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const getWeatherInfo = async (city) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=02ac7d991d8140b6b28180006240805&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      const data = await response.json();
      setWeatherData(data);
      setBackgroundImage(getBackgroundImage(data));
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = () => {
    const input = document.querySelector(".search input");
    if (input.value.trim() !== "") {
      getWeatherInfo(input.value.trim());
    }
  };

  const getBackgroundImage = (data) => {
   
    const hours = data.location.localtime.slice(10).slice(0,3);
 
    if (hours >= 6 && hours < 18) { 
      return getDayBackground(data.current.condition.code);
    } else {
      return "url('./img/night.jpg')";
    }
  };
  const getDayBackground = (conditionCode) => {
    switch (conditionCode) {
      case 1000:
        return "url('./img/clear.jpg')";
      case 1003:
        return "url('./img/partly_cloudy.jpg')";
      case 1006:
        return "url('./img/cloudy.jpg')"; 
      default:
        return "url('./img/default.jpg')"; 
    }
  };

  return (
    <div className="weather" style={{ backgroundImage: backgroundImage }}>
      <div className="main">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="container">
          <div className="left">
            {weatherData && weatherData.current && (
              <img src={weatherData.current.condition.icon} alt="" />
            )}
          </div>
          <div className="right">
            {weatherData && (
              <>
                <p>
                  <strong>Country: </strong>
                  {weatherData.location.country}
                </p>
                <h4>
                  <strong>City: </strong>
                  {weatherData.location.name}
                </h4>
                <h4>
                  <strong>Last Updated: </strong>
                  {weatherData.current.last_updated}
                </h4>
                <h4>{weatherData.location.localtime}</h4>
                <h3>{weatherData.current.condition.wind_degree}</h3>
                <div className="temp">
                  <span>
                    <strong>Temperatue: </strong>
                    {weatherData.current.temp_c} °C
                  </span>
                  <span>{" "}{weatherData.current.temp_f} °F</span>
                </div>
                <span>
                  <strong>Humidity: </strong>
                  {weatherData.current.humidity}
                </span>
                <span>
                  <strong> Wind Direction: </strong>
                  {weatherData.current.wind_dir}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
