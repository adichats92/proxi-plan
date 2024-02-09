import { useState, useEffect, useContext } from 'react';
import instance from '../../../../axiosInstance';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from 'react-router-dom';

const NewsDetails = () => {
	const [country, setCountry] = useState('');
	const [news, setNews] = useState([]);
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
			const apiUrl = `https://newsdata.io/api/1/news?country=${country}&apikey=pub_3778643f8f66ed250c71e1e81a8c5e930936a`;

			try {
				const res = await fetch(apiUrl);
				const data = await res.json();
				console.log(data);
				setNews(data.results || []);
			} catch (error) {
				console.error('Error fetching news:', error);
			}
		};
		if (country) {
			fetchNews();
		}
	}, [country]);
	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};

	return (
		<div className='mt-24 p-6 mx-20 lg:mx-72 xl:mx-96'>
			{news.length > 0 ? (
				news.map((article, index) => (
					<div
						key={index}
						className='article text-gray-800  m-8 p-6 bg-white bg-opacity-50 backdrop-blue-md rounded-lg'
					>
						<h2 className='font-bold text-lg mb-4'>{article.title}</h2>
						<p className='mb-4'>
							{article.description || 'No description available.'}
						</p>
						<a
							href={article.link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 hover:underline mt-4'
						>
							Read more
						</a>
						<p className='text-sm text-gray-600 mt-2'>
							Published at: {article.pubDate}
						</p>
						<button
							className=' bg-emerald-400 hover:bg-blue-600 border-none rounded-lg text-white fixed top-72 left-2 px-4 py-3'
							onClick={handleGoBackClick}
						>
							<ArrowBackRoundedIcon fontSize='medium' />
						</button>
					</div>
				))
			) : (
				<>
					<p className='text-center text-gray-800 p-2 m-2'>
						No news available for {country}.
					</p>
					<button
						className=' bg-emerald-400 hover:bg-blue-600 border-none rounded-lg text-white fixed top-72 left-2 px-4 py-3'
						onClick={handleGoBackClick}
					>
						<ArrowBackRoundedIcon fontSize='medium' />
					</button>
				</>
			)}
		</div>
	);
};

export default NewsDetails;
