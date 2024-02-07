import { useState, useEffect } from 'react';
import {
	GoogleMap,
	LoadScript,
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

const Map = () => {
	const [location, setLocation] = useState(null);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const response = await instance.get('/api/location/getlocation');
				if (response.data && response.data.location) {
					setLocation({
						lat: response.data.location.coordinates[1],
						lng: response.data.location.coordinates[0],
					});
				}
			} catch (error) {
				console.error('Failed to fetch location:', error);
			}
		};
		fetchLocation();
	}, []);

	const apiKey = 'AIzaSyB_P3BYqHt-ryAD_t3dYHCAcCE7fhg983I';

	return (
		<LoadScript googleMapsApiKey={apiKey}>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={location || defaultCenter}
				zoom={13}
			>
				<TrafficLayer autoUpdate />
				<TransitLayer />
				{location && <Marker position={location} />}
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;
