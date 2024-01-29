import Routing from './components/Routing';
import Header from './components/Header';
import Footer from './components/Footer';
import { Flowbite } from 'flowbite-react';
const App = () => {
	return (
		<>
			<Flowbite>
				<Header />
				<Routing />
				<Footer />
			</Flowbite>
		</>
	);
};

export default App;
