/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';
// import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import defaultImage from '/logoS.png';
import { Card } from 'flowbite-react';
import instance from '../../../../axiosInstance';

export default function Radio() {
	const [stations, setStations] = useState([]);
	const [currentStationIndex, setCurrentStationIndex] = useState(0);
	const [userState, setUserState] = useState('');
	const [userCountryCode, setUserCountryCode] = useState('');

	const { user } = useContext(AuthContext);

	const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(false);

	console.log('USER STATE', userState);
	console.log('Stations', stations);
	console.log('COUNTRY', userCountryCode);

	useEffect(() => {
		instance
			.get('/api/apilocation/')
			.then((response) => {
				console.log('response for radio  apilocation', response);
				setUserState(response.data.apiLocationInstance.state);
				setUserCountryCode(response.data.apiLocationInstance.country);
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, [user]);

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
		<Card className='rounded-none shadow-none border-none m-2 mx-10 text-sky-400 bg-cyan-100 dark:text-gray-200'>
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
				src={currentStation?.url_resolved || ''}
				autoPlayAfterSrcChange={isAutoPlayEnabled}
				customProgressBarSection={[]}
				customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
				showJumpControls={false}
				showSkipControls={true}
				onClickPrevious={handlePrevious}
				onClickNext={handleNext}
				onPlay={handlePlay}
				layout='stacked'
				className='pb-4 rounded-lg bg-gradient-to-r from-cyan-100 to-emerald-100 dark:bg-emerald-800 flex'
			/>
		</Card>
	);
}
