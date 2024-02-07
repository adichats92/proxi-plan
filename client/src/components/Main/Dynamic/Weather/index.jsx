import { useEffect, useState } from 'react';
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import instance from '../../../../axiosInstance';

const Weather = () => {
	const [location, setLocation] = useState({});

	useEffect(() => {
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

	const { data, isLoading, errorMessage } = useWeatherBit({
		key: '9b3c40c6f7b44fae94299ac20a1d229e',
		lat: location.lat,
		lon: location.lon,
		lang: 'en',
		unit: 'metric',
	});

	const customStyles = {
		fontFamily: 'Helvetica, sans-serif',
		gradientStart: '#0181C2',
		gradientMid: '#04A7F9',
		gradientEnd: '#4BC4F7',
		locationFontColor: '#FFF',
		todayTempFontColor: '#FFF',
		todayDateFontColor: '#B5DEF4',
		todayRangeFontColor: '#B5DEF4',
		todayDescFontColor: '#B5DEF4',
		todayInfoFontColor: '#B5DEF4',
		todayIconColor: '#FFF',
		forecastBackgroundColor: '#FFF',
		forecastSeparatorColor: '#DDD',
		forecastDateColor: '#777',
		forecastDescColor: '#777',
		forecastRangeColor: '#777',
		forecastIconColor: '#4BC4F7',
	};

	return (
		<div>
			{location && (
				<ReactWeather
					theme={customStyles}
					isLoading={isLoading}
					errorMessage={errorMessage}
					data={data}
					lang='en'
					locationLabel={location.place}
					unitsLabels={{ temperature: '°C', windSpeed: 'Km/h' }}
					showForecast
				/>
			)}
		</div>
	);
};

export default Weather;
