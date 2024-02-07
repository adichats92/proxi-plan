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
		gradientStart: '#ffffff80',
		gradientMid: '#ffffff80',
		gradientEnd: '#ffffff80',
		locationFontColor: '#008c00',
		todayTempFontColor: '#008296',
		todayDateFontColor: '#323232',
		todayRangeFontColor: '#323232',
		todayDescFontColor: '#323232',
		todayInfoFontColor: '#323232',
		todayIconColor: '#50b4e1',
		forecastBackgroundColor: '#00000033',
		forecastSeparatorColor: '#000000',
		forecastDateColor: '#ffffff',
		forecastDescColor: '#ffffff',
		forecastRangeColor: '#ffffff',
		forecastIconColor: '#4BC4F7',
	};

	return (
		<div
			className='weather-widget'
			style={{ width: '100%', height: '100%' }}
		>
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
					className='w-widget'
				/>
			)}
		</div>
	);
};

export default Weather;
