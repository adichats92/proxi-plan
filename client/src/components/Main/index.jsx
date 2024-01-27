import Protected from '../../Protected';
import Todos from './Static/Todos';
import Map from './Dynamic/Map';
import News from './Dynamic/News';
import { Routes, Route } from 'react-router-dom';
import Login from './User/Login';
import Register from './User/Register';
import Community from './Dynamic/Community';
import Static from './Static';

function Main() {
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
					path='home'
					element={<Static />}
				/>
				<Route
					path='posts'
					element={<Community />}
				/>
				<Route
					path='todos'
					element={<Todos />}
				/>
				<Route
					path='map'
					element={<Map />}
				/>
				<Route
					path='news'
					element={<News />}
				/>
			</Route>
			{/* <Route
					path='*'
					element={<NotFound />}
				/> */}
		</Routes>
	);
}

export default Main;
