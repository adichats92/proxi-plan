import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import instance from '../../../../axiosInstance';
import { useMap } from 'react-leaflet';
import { AuthContext } from '../../../../context/Auth';

const Map = () => {
	const [location, setLocation] = useState(null);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		const fetchLocation = async () => {
			try {
				const response = await instance.get('/api/location/getlocation');
				setLocation(response.data.location);
			} catch (error) {
				console.error('Failed to fetch location:', error);
			}
		};
		fetchLocation();
	}, [user]);

	// eslint-disable-next-line react/prop-types
	const ChangeView = ({ center, zoom }) => {
		const map = useMap();

		useEffect(() => {
			map.setView(center, zoom);
		}, [center, zoom, map]);

		return null;
	};

	if (!location) {
		return <div>Loading map...</div>;
	}

	return (
		<MapContainer
			center={[51.505, -0.09]}
			zoom={13}
			style={{ height: '500px', width: '100%' }}
			whenCreated={(map) => {
				map.setView(
					new L.LatLng(location.coordinates[1], location.coordinates[0]),
					13
				);
			}}
		>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{location && (
				<>
					<ChangeView
						center={[location.coordinates[1], location.coordinates[0]]}
						zoom={13}
					/>
					<Marker
						position={[location.coordinates[1], location.coordinates[0]]}
						icon={
							new L.Icon({
								iconUrl: './location.png',
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [1, -34],
							})
						}
					>
						<Popup>
							A location <br /> More details if available.
						</Popup>
					</Marker>
				</>
			)}
		</MapContainer>
	);
};

export default Map;
