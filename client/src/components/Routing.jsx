import Protected from '../Protected';
import Todos from './Main/Sidebar/Todos';
import Map from './Main/Dynamic/Map';
import News from './Main/Dynamic/News';
import { Routes, Route } from 'react-router-dom';
import Login from './Main/User/Login';
import Register from './Main/User/Register';
import Community from './Main/Dynamic/Community';
import Main from './Main';
import Radio from './Main/Sidebar/Radio';

function Routing() {
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
					path='home/*'
					element={<Main />}
				/>
				<Route
					path='community'
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
				<Route
					path='radio'
					element={<Radio />}
				/>
			</Route>
			{/* <Route
					path='*'
					element={<NotFound />}
				/> */}
		</Routes>
	);
}

export default Routing;
