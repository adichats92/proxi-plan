import { useEffect, useContext } from 'react';
import { getLocation } from '../../location';
import Login from './User/Login';
import Register from './User/Register';
import Static from '../Main/Static';
import Dynamic from '../Main/Dynamic';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../context/Auth';
// import { LocationProvider } from '../../context/Location';

function Main() {
	useEffect(() => {
		getLocation();
	}, []);
	const { user } = useContext(AuthContext);

	return (
		<>
			{/* <LocationProvider> */}
			<Header />
			{!user ? (
				<div>
					<Login />
					<Register />
				</div>
			) : (
				<div>
					<Static />
					<Dynamic />
				</div>
			)}
			<button onClick={getLocation}>Location</button>
			<Footer />
			{/* </LocationProvider> */}
		</>
	);
}

export default Main;
