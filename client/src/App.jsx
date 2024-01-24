import { useEffect } from 'react';

import './App.css';
import { getLocation } from './location';
import Login from './components/Main/User/Login';

function App() {
	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			<Login />
			<button onClick={getLocation}></button>
		</>
	);
}

export default App;
