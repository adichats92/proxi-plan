import Protected from '../Protected';
import Todos from './Main/Home/Todos';
import Map from './Main/Home/Dynamic/Map';
import News from './Main/Home/Dynamic/News';
import { Routes, Route } from 'react-router-dom';
import Login from './Main/User/Login';
import Register from './Main/User/Register';
import Community from './Main/Home/Dynamic/Community';
import Home from './Main';

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
					element={<Home />}
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
