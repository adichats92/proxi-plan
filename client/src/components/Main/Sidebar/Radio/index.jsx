/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from '/logoS.png';
import { Card } from 'flowbite-react';
import instance from '../../../../axiosInstance';

export default function Radio() {
	const [stations, setStations] = useState([]);
	const [currentStationIndex, setCurrentStationIndex] = useState(0);
	const [userLocation, setUserLocation] = useState(null);
	const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);
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
			setCurrentStationIndex(0);
		}
	}, [stations, currentStationIndex]);

	const fetchStations = async (location) => {
		const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');
		const allStations = await api.searchStations({ limit: 50000 });

		const latRange = 0.9;
		const lonRange = 0.9;
		const localStations = allStations.filter((station) => {
			const latDiff = Math.abs(station.geoLat - location[1]);
			const lonDiff = Math.abs(station.geoLong - location[0]);
			return latDiff <= latRange && lonDiff <= lonRange;
		});
		console.log('StationNames', localStations.name);
		setStations(localStations);
	};

	const handlePlay = () => {
		if (!isAutoPlayEnabled) {
			setIsAutoPlayEnabled(true);
		}
	};
	const handleStationChange = (newIndex) => {
		setCurrentStationIndex(newIndex);
	};

	const handlePrevious = () =>
		handleStationChange(
			currentStationIndex === 0 ? stations.length - 1 : currentStationIndex - 1
		);
	const handleNext = () =>
		handleStationChange(
			currentStationIndex === stations.length - 1 ? 0 : currentStationIndex + 1
		);

	const setDefaultSrc = (event) => {
		event.target.src = defaultImage;
	};

	const currentStation = stations[currentStationIndex];

	return (
		<Card className='rounded-none m-2 text-sky-400 dark:text-gray-200'>
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
				autoPlayAfterSrcChange={isAutoPlayEnabled}
				customProgressBarSection={[]}
				customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
				showJumpControls={false}
				showSkipControls={true}
				onClickPrevious={handlePrevious}
				onClickNext={handleNext}
				onPlay={handlePlay}
				layout='stacked'
				className='pb-4 bg-emerald-100 dark:bg-emerald-800'
			/>
		</Card>
	);
}
