import { useEffect } from 'react';
import { getLocation } from '../../location';

function Main() {
	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<nav>
				<ul className='li'>Home</ul>
				<ul className='li'>About</ul>
				<ul className='li'>More</ul>
			</nav>

			<button onClick={getLocation}></button>
		</>
	);
}

export default Main;
