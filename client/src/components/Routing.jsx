// Routing.js
import { Routes, Route } from 'react-router-dom';
import Protected from '../Protected';
import Login from './Main/User/Login';
import Register from './Main/User/Register';
import Main from './Main';
import Todos from './Main/Sidebar/Todos';
import Radio from './Main/Sidebar/Radio';
import Community from './Main/Dynamic/Community';
import PostsAll from './Main/Dynamic/Community/Posts/PostsAll';
import Dynamic from './Main/Dynamic';
import Weather from './Main/Dynamic/Weather';
import Profile from './Main/Dynamic/Profile';
import NewsDetails from './Main/Dynamic/News/NewsDetails';

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
				>
					<Route
						index
						element={<Dynamic />}
					/>
					<Route
						path='community'
						element={<Community />}
					/>
					<Route
						path='posts'
						element={<PostsAll />}
					/>
					<Route
						path='todos'
						element={<Todos />}
					/>
					<Route
						path='profile'
						element={<Profile />}
					/>
					<Route
						path='news'
						element={<NewsDetails />}
					/>
					<Route
						path='radio'
						element={<Radio />}
					/>
					<Route
						path='weather'
						element={<Weather />}
					/>
				</Route>
			</Route>
			{/* <Route path='*' element={<NotFound />} /> */}
		</Routes>
	);
}

export default Routing;
