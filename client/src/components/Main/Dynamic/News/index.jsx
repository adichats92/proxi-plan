import { useState, useEffect, useContext } from 'react';
import instance from '../../../../axiosInstance';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';

const NewsComponent = () => {
	const [articles, setArticles] = useState([]);
	const [country, setCountry] = useState('');
	const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
	const [animate, setAnimate] = useState('fadein');

	const { user } = useContext(AuthContext);
	const { location } = useContext(LocationContext);

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
			// const apiKey = 'pub_3778643f8f66ed250c71e1e81a8c5e930936a';
			const apiUrl = `https://newsdata.io/api/1/news?country=${country}&apikey=pub_3778643f8f66ed250c71e1e81a8c5e930936a`;

			try {
				const response = await fetch(apiUrl);
				const data = await response.json();
				setArticles(data.results);
				setCurrentArticleIndex(0);
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};

		fetchNews();
	}, [country, user, location]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setAnimate('fadeout');
			setTimeout(() => {
				setCurrentArticleIndex((prevIndex) =>
					prevIndex + 1 >= articles.length ? 0 : prevIndex + 1
				);
				setAnimate('fadein');
			}, 1500);
		}, 5000);

		return () => clearInterval(intervalId);
	}, [articles]);

	const currentArticle = articles[currentArticleIndex];

	return (
		<div>
			<h1 className='text-center m-4 text-2xl font-bold text-emerald-600'>
				Top Headlines
			</h1>
			{currentArticle && (
				<div
					className={`transition-opacity duration-1000 ${
						animate === 'fadein' ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<h2 className='mb-2 text-xl font-semibold text-cyan-700'>
						{currentArticle.title}
					</h2>
					<p className='mb-4'>{currentArticle.description}</p>
					<a
						className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'
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

export default NewsComponent;
