import { useState, useEffect, useRef } from 'react';
import {
	GoogleMap,
	TrafficLayer,
	TransitLayer,
	Marker,
} from '@react-google-maps/api';
import instance from '../../../../axiosInstance';

const mapContainerStyle = {
	width: '100%',
	height: '100%',
};

const defaultCenter = { lat: -34.397, lng: 150.644 };

const MapComponent = () => {
	const [location, setLocation] = useState(null);
	const mapRef = useRef(null);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const response = await instance.get('/api/location/getlocation');
				if (response.data && response.data.location) {
					const fetchedLocation = {
						lat: response.data.location.coordinates[1],
						lng: response.data.location.coordinates[0],
					};
					setLocation(fetchedLocation);

					if (mapRef.current) {
						mapRef.current.panTo(fetchedLocation);
					}
				}
			} catch (error) {
				console.error('Failed to fetch location:', error);
			}
		};
		fetchLocation();
	}, []);

	const handleLocationReset = () => {
		if (mapRef.current && location) {
			mapRef.current.panTo(location);
			mapRef.current.setZoom(13);
		}
	};

	return (
		<>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={location || defaultCenter}
				zoom={13}
				onLoad={(map) => (mapRef.current = map)}
			>
				{location && (
					<>
						<TrafficLayer autoUpdate />
						<TransitLayer autoUpdate />
						<Marker position={location} />
					</>
				)}
			</GoogleMap>
			<button
				onClick={handleLocationReset}
				style={{
					position: 'relative',
					top: '-60px',
					left: '15px',
					zIndex: '40',
					borderRadius: '2px',
					padding: '5px',
				}}
				className='text-gray-800 border-none bg-white hover:bg-neutral-200'
			>
				Reset
			</button>
		</>
	);
};

export default MapComponent;
