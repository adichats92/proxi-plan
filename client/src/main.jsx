import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/Auth.jsx';
import { LocationProvider } from './context/Location.jsx';
import { PostsProvider } from './context/Posts.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<LocationProvider>
					<PostsProvider>
						<App />
					</PostsProvider>
				</LocationProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
