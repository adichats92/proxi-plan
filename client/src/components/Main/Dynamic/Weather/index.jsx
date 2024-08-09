import { useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import instance from '../../../../axiosInstance';

const Weather = () => {
	const [location, setLocation] = useState({});
	const [weatherData, setWeatherData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch the location first
		instance
			.get('/api/apilocation')
			.then((response) => {
				setLocation({
					lat: response.data.apiLocationInstance.lat,
					lon: response.data.apiLocationInstance.lon,
					place: response.data.apiLocationInstance.name,
				});
			})
			.catch((error) => console.error('Failed to fetch location:', error));
	}, []);

	useEffect(() => {
		if (location.lat && location.lon) {
			// Fetch the weather data from the backend
			instance
				.get('/api/apiWeather', {
					params: {
						lat: location.lat,
						lon: location.lon,
					},
				})
				.then((response) => {
					setWeatherData(response.data.current); // Set the current weather data
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Failed to fetch weather data:', error);
					setError('Failed to fetch weather data');
					setIsLoading(false);
				});
		}
	}, [location]);

	const getWeatherIcon = (weatherCode) => {
		switch (weatherCode) {
			case 800:
				return 'CLEAR_DAY';
			case 801:
			case 802:
				return 'PARTLY_CLOUDY_DAY';
			case 803:
			case 804:
				return 'CLOUDY';
			case 500:
			case 501:
			case 502:
			case 503:
			case 504:
				return 'RAIN';
			case 511:
			case 600:
			case 601:
			case 602:
				return 'SNOW';
			case 611:
			case 612:
			case 613:
			case 615:
			case 616:
			case 620:
			case 621:
			case 622:
				return 'SLEET';
			case 701:
			case 711:
			case 721:
			case 731:
			case 741:
			case 751:
			case 761:
			case 762:
			case 771:
			case 781:
				return 'FOG';
			case 900:
			case 901:
			case 902:
			case 903:
			case 904:
			case 905:
			case 906:
				return 'WIND';
			default:
				return 'CLEAR_DAY';
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className='weather-widget'>
			{location && weatherData && (
				<div className=''>
					<h2 className='text-3xl font-bold text-gray-800 p-3'>
						{location.place}
					</h2>
					<span className='p-3'>
						<ReactAnimatedWeather
							icon={getWeatherIcon(weatherData.weather[0].id)}
							color='yellow'
							size={72}
							animate={true}
						/>
					</span>
					<p className='text-2xl text-teal-800 font-bold p-3'>
						Temp: {weatherData.temp}°C
					</p>
					<p className='text-2xl text-emerald-700 font-bold p-3'>
						Wind Speed: {weatherData.wind_speed} m/s
					</p>
					<p className='text-2xl text-purple-600 font-bold p-3'>
						Overall: {weatherData.weather[0].description}
					</p>
				</div>
			)}
		</div>
	);
};

export default Weather;
