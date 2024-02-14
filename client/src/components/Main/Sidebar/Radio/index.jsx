/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from '/radio.jpeg';
import { Card } from 'flowbite-react';
import instance from '../../../../axiosInstance';
import { Tooltip } from '@mui/material';

export default function Radio() {
	const [stations, setStations] = useState([]);
	const [currentStationIndex, setCurrentStationIndex] = useState(0);
	const [userState, setUserState] = useState('');
	const [userCountryCode, setUserCountryCode] = useState('');

	const { user } = useContext(AuthContext);
	const { location } = useContext(LocationContext);

	const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);

	// const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		instance
			.get('/api/apilocation/')
			.then((response) => {
				const locationState =
					response.data.apiLocationInstance.state ||
					response.data.apiLocationInstance.name;
				setUserState(locationState);
				setUserCountryCode(response.data.apiLocationInstance.country);
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, [user, location]);

	useEffect(() => {
		if (stations.length > 0 && currentStationIndex >= stations.length) {
			setCurrentStationIndex(0);
		}
	}, [stations, currentStationIndex]);

	useEffect(() => {
		if ((userState, userCountryCode)) {
			fetchStations();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userState, userCountryCode]);

	const fetchStations = async () => {
		try {
			const url = `/api/radio?state=${encodeURIComponent(
				userState
			)}&countrycode=${encodeURIComponent(userCountryCode.toLowerCase())}`;
			const response = await instance.get(url);
			setStations(response.data);
		} catch (error) {
			console.error('Error fetching stations:', error);
		}
	};

	const handlePlay = () => {
		if (!isAutoPlayEnabled) {
			setIsAutoPlayEnabled(true);
			// setIsPlaying(true);
		}
	};
	// const handlePause = () => {
	// 	setIsPlaying(false);
	// 	setIsAutoPlayEnabled(false);
	// 	setIsPlaying(false);
	// };
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
		<div className='flex flex-row justify-center items-center shadow-none border-none text-white bg-transparent px-1 rounded-lg'>
			<div>
				<Tooltip title={currentStation?.name}>
					<img
						src={currentStation?.favicon || defaultImage}
						alt='Station Logo'
						className='w-8 h-8 rounded-full me-3'
						onError={setDefaultSrc}
					/>
				</Tooltip>
			</div>
			<AudioPlayer
				src={currentStation?.url_resolved || ''}
				autoPlayAfterSrcChange={isAutoPlayEnabled}
				customProgressBarSection={[]}
				customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
				showJumpControls={false}
				showSkipControls={true}
				onClickPrevious={handlePrevious}
				onClickNext={handleNext}
				onPlay={handlePlay}
				// onPause={handlePause}
				layout='stacked'
				className='flex ms-1 md:min-w-72 min-w-40 pt-1 flex-row items-center justify-center rounded-full bg-transparent border-none shadow-none'
			/>
		</div>
	);
}
