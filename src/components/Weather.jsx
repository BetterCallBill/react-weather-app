import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { useEffect, useState, useRef } from 'react';

export default function Weather() {
    
    // Store data in weatherData
    const [weatherData, setWeatherData] = useState(false);
    
    const inputRef = useRef();
    
    useEffect(() => {
        search('London');
    }, []);

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
                import.meta.env.VITE_API_KEY
            }`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                location: data.name
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Enter city' />
                <img src={search_icon} alt='' onClick={() => search(inputRef.current.value)} />
            </div>
            <img src={clear_icon} alt='' className='weather-icon' />
            <p className='temperature'>{weatherData?.temperature}°c</p>
            <p className='location'>London</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt='' />
                    <div className='text'>
                        <p>{weatherData?.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className='col'>
                    <img src={wind_icon} alt='' />
                    <div className='text'>
                        <p>{weatherData?.windSpeed}m/s</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
