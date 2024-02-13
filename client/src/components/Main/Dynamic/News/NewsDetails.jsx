import { useState, useEffect, useContext } from 'react';
import instance from '../../../../axiosInstance';
import { AuthContext } from '../../../../context/Auth';
import { LocationContext } from '../../../../context/Location';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const NewsDetails = () => {
	const [country, setCountry] = useState('');
	const [news, setNews] = useState([]);
	const { user } = useContext(AuthContext);
	const { location } = useContext(LocationContext);

	useEffect(() => {
		instance
			.get('/api/apilocation/')
			.then((response) => {
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
						<Tooltip title='Previous'>
							<button
								className=' bg-emerald-400 text-md font-light hover:bg-blue-600 md:p-2 md:ps-16 p-2 md:hover:ps-20 md:hover:pt-2 pt-3 md:hover:pb-2 pb-3 hover:pb-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed md:bottom-36 md:left-0 bottom-0 left-60 md:z-0 z-50'
								onClick={handleGoBackClick}
							>
								{/* <ArrowBackRoundedIcon fontSize='medium' /> */}
								Back
							</button>
						</Tooltip>
					</div>
				))
			) : (
				<>
					<p className='text-center text-gray-800 p-2 m-2'>
						No news available for {country}.
					</p>
					<Tooltip title='Previous'>
						<button
							className=' bg-emerald-400 text-md font-light hover:bg-blue-600 md:p-2 md:ps-16 p-2 md:hover:ps-20 md:hover:pt-2 pt-3 md:hover:pb-2 pb-3 hover:pb-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed md:bottom-36 md:left-0 bottom-0 left-60 md:z-0 z-50'
							onClick={handleGoBackClick}
						>
							Back
						</button>
					</Tooltip>
				</>
			)}
		</div>
	);
};

export default NewsDetails;
