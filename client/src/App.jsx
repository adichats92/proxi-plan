import Routing from './components/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Flowbite } from 'flowbite-react';
const App = () => {
	return (
		<div
			className='flex flex-col min-h-screen bg-gradient-to-r 
		from-cyan-300 
		to-purple-300 
		via-blue-300 animate-gradient'
		>
			<Flowbite>
				<Header />
				<div className='flex-grow'>
					<Routing />
				</div>
				<Footer />
			</Flowbite>
		</div>
	);
};

export default App;
