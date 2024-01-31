import Routing from './components/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Flowbite } from 'flowbite-react';
const App = () => {
	return (
		<div className='flex flex-col min-h-screen bg-cyan-100 dark:bg-gray-800'>
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
