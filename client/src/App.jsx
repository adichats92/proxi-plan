import { Routes, Route } from 'react-router-dom';
import Login from './components/Main/User/Login';
import Register from './components/Main/User/Register';
import Main from './components/Main';
import Community from './components/Main/Dynamic/Community';
import Protected from './Protected';
import Todos from './components/Main/Static/Todos';

const App = () => {
	return (
		<Routes>
			<Route
				path='/login'
				element={<Login />}
			/>
			<Route
				path='/register'
				element={<Register />}
			/>
			<Route
				path='/'
				element={<Protected />}
			>
				<Route
					path='/'
					element={<Main />}
				/>
				<Route
					path='/posts'
					element={<Community />}
				/>
				<Route
					path='/todos'
					element={<Todos />}
				/>
			</Route>

			{/* Add other routes here */}
		</Routes>
	);
};

export default App;
