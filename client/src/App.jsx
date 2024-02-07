import Routing from './components/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Flowbite } from 'flowbite-react';
import { LoadScript } from '@react-google-maps/api';
const App = () => {
	return (
		<div
			className='flex flex-col min-h-screen bg-gradient-to-r 
		from-emerald-400 
		to-emerald-400 
		via-blue-400'
		>
			<LoadScript
				googleMapsApiKey='AIzaSyB_P3BYqHt-ryAD_t3dYHCAcCE7fhg983I'
				key='google-map-script'
			>
				<Flowbite>
					<Header />
					<div className='flex-grow'>
						<Routing />
					</div>
					<Footer />
				</Flowbite>
			</LoadScript>
		</div>
	);
};

export default App;
