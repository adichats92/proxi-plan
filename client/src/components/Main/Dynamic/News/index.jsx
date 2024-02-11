import { useState, useEffect, useContext } from 'react';
import instance from '../../../../axiosInstance';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';

const News = () => {
	const [articles, setArticles] = useState([]);
	const [country, setCountry] = useState('');
	const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
	const [animate, setAnimate] = useState('fadein');
	const [apiKey, setApiKey] = useState('');

	const { user } = useContext(AuthContext);
	const { location } = useContext(LocationContext);

	useEffect(() => {
		const fetchApiKey = async () => {
			try {
				const response = await instance.get('/api/keys');
				const keys = await response.data;
				setApiKey(keys.news);
			} catch (error) {
				console.error('Error fetching API key:', error);
			}
		};

		fetchApiKey();
	}, []);

	useEffect(() => {
		instance
			.get('/api/apilocation/')
			.then((response) => {
				console.log('response for news apilocation', response);
				setCountry(response.data.apiLocationInstance.country.toLowerCase());
			})
			.catch((error) => console.error('Error fetching user location:', error));
	}, [user, location]);

	useEffect(() => {
		const fetchNews = async () => {
			if (!apiKey) return;
			// const apiUrl = `https://newsdata.io/api/1/news?country=${country}&apikey=pub_3778643f8f66ed250c71e1e81a8c5e930936a`;
			const apiUrl = `https://newsdata.io/api/1/news?country=${country}&apikey=${apiKey}`;
			try {
				const response = await fetch(apiUrl);
				const data = await response.json();
				setArticles(data.results);
				setCurrentArticleIndex(0);
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};
		if (country) {
			fetchNews();
		}
	}, [country, user, location, apiKey]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setAnimate('fadeout');
			setTimeout(() => {
				setCurrentArticleIndex((prevIndex) =>
					prevIndex + 1 >= articles.length ? 0 : prevIndex + 1
				);
				setAnimate('fadein');
			}, 2000);
		}, 6000);

		return () => clearInterval(intervalId);
	}, [articles]);

	const currentArticle = articles[currentArticleIndex];

	return (
		<div className='min-h-96 bg-white bg-opacity-0'>
			<h1 className='text-center mb-12 text-2xl font-light dark:text-emerald-400 text-emerald-600'>
				Top News
			</h1>
			{currentArticle && (
				<div
					className={`transition-opacity duration-1000 ${
						animate === 'fadein' ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<h2
						className='mb-2 text-xl font-semibold text-cyan-700 overflow-auto text-overflow-ellipsis'
						style={{
							display: '-webkit-box',
							WebkitLineClamp: '3',
							WebkitBoxOrient: 'vertical',
							maxHeight: '8rem',
						}}
					>
						{currentArticle.title}
					</h2>
					<p
						className='my-4 text-gray-800 overflow-auto text-overflow-ellipsis'
						style={{
							display: '-webkit-box',
							WebkitLineClamp: '5',
							WebkitBoxOrient: 'vertical',
							maxHeight: '12rem',
						}}
					>
						{currentArticle.description}
					</p>
					<a
						className='absolute bottom-6 inline-block bg-emerald-400 text-white py-2 px-4 rounded hover:bg-blue-600 transition'
						href={currentArticle.link}
						target='_blank'
						rel='noopener noreferrer'
					>
						Read more
					</a>
				</div>
			)}
		</div>
	);
};

export default News;
