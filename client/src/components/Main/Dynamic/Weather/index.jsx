/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import instance from '../../../../axiosInstance';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';
import { format } from 'date-fns';

export const Weather = () => {
	const [weatherData, setWeatherData] = useState({});
	const [currentWeather, setCurrentWeather] = useState({});
	const [dailyForecast, setDailyForecast] = useState([]);
	console.log(weatherData);
	const { user } = useContext(AuthContext);
	const { location } = useContext(LocationContext);

	useEffect(() => {
		if (weatherData.current && weatherData.daily) {
			setCurrentWeather(weatherData.current);
			setDailyForecast(weatherData.daily.slice(1, 6)); // Get next 5 days forecast
		}
	}, [weatherData]);
	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const response = await instance.get(`/api/apiweather`);
				setWeatherData(response.data);
				console.log('Weather', response.data);
			} catch (error) {
				console.error('Error fetching the weather data', error);
			}
		};
		if (user && location) {
			fetchWeatherData();
		}

		fetchWeatherData();
	}, [user, location]);

	return (
		<>
			<div className='weather-component'>
				<div className='current-weather'>
					<h2>Current Weather</h2>
					<p>{currentWeather.temp}°C</p>
					<p>
						{currentWeather.weather && currentWeather.weather[0].description}
					</p>
				</div>
				<div className='daily-forecast'>
					<h2>5-Day Forecast</h2>
					{dailyForecast.map((day, index) => (
						<div
							key={index}
							className='forecast-day'
						>
							<p>{format(new Date(day.dt * 1000), 'EEEE')}</p>
							<p>Day: {day.temp.day}°C</p>
							<p>Night: {day.temp.night}°C</p>
							<p>{day.weather[0].description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export default Weather;
