import React, { useEffect, useRef, useState } from 'react';
import humidity_icon from '../assets/humidity.png';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import './Weather.css';

const Weather = () => {
    const inputRef = useRef();
    const [weatherdata, setWeatherData] = useState(null);
    

    const search = async (city) => {
        if (!city) {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }

            const weather_icon = data.weather[0]['icon']
            const weather_image = `https://openweathermap.org/img/wn/${weather_icon}@2x.png`

            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                description: data.weather[0]['description'],
                weather_icon: weather_image
            });
        } catch (error) {
            setWeatherData(null);
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("London");
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="Search Icon" onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherdata && (
                <>
                    <img src={weatherdata.weather_icon} alt="Weather Image" className='weather-icon' />
                    <p className='temperature'>{weatherdata.temperature}&deg; C</p>
                    <p className='description'>{weatherdata.description}</p>

                    <div className='weather-data'>
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity icon" />
                            <div>
                                <p>{weatherdata.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>

                        <div className="col">
                            <img src={wind_icon} alt="Wind icon" />
                            <div>
                                <p>{weatherdata.windSpeed} Km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
