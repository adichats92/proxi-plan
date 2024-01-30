/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from '/logoS.png';
import { Card } from 'flowbite-react';
import instance from '../../../../axiosInstance';

function calculateDistance(lat1, lon1, lat2, lon2) {
	// Haversine formula
	const R = 6371; // Earth radius in kilometers
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

export default function Radio() {
	const [stations, setStations] = useState([]);
	const [currentStationIndex, setCurrentStationIndex] = useState(0);
	const [userLocation, setUserLocation] = useState(null);
	console.log(stations);
	useEffect(() => {
		instance
			.get('/api/location/getlocation')
			.then((response) => {
				console.log(response);
				if (response.data && response.data.location) {
					const location = response.data.location.coordinates;
					setUserLocation(location);
					fetchStations(location);
				}
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, []);

	useEffect(() => {
		if (stations.length > 0 && currentStationIndex >= stations.length) {
			setCurrentStationIndex(0); // Reset to first station if index goes out of bounds
		}
	}, [stations, currentStationIndex]);

	const fetchStations = async (location) => {
		const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');
		const allStations = await api.searchStations({ limit: 25000 });
		console.log(allStations);
		const localStations = allStations.filter(
			(station) =>
				calculateDistance(
					location[1],
					location[0],
					station.geoLat,
					station.geoLong
				) <= 50
		);
		setStations(localStations);
	};

	const handlePrevious = () => {
		setCurrentStationIndex((prevIndex) =>
			prevIndex === 0 ? stations.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentStationIndex((prevIndex) =>
			prevIndex === stations.length - 1 ? 0 : prevIndex + 1
		);
	};

	const setDefaultSrc = (event) => {
		event.target.src = defaultImage;
	};

	const currentStation = stations[currentStationIndex];

	return (
		<Card className='rounded-none'>
			<div className='flex items-center gap-4 mb-4'>
				<img
					src={currentStation?.favicon || defaultImage}
					alt='Station Logo'
					className='w-12 h-12 rounded-full'
					onError={setDefaultSrc}
				/>
				<h2 className='text-md  text- font-semibold'>
					Now Playing: {currentStation?.name || 'Select a Station'}
				</h2>
			</div>
			<AudioPlayer
				src={currentStation?.urlResolved || ''}
				customProgressBarSection={[]}
				customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
				autoPlayAfterSrcChange={false}
				showJumpControls={false}
				showSkipControls={true}
				className='w-full min-w-lg dark:bg-teal-900 pt-1 flex flex-col'
				onClickPrevious={() => handlePrevious()}
				onClickNext={() => handleNext()}
				layout='stacked'
			/>
		</Card>
	);
}
