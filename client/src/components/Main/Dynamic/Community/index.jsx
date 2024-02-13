import PostsAll from './Posts/PostsAll';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const Community = () => {
	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};
	return (
		<div className=''>
			<h6 className='text-center font-bold text-2xl text-cyan-500 dark:text-white p-6 mb-6'>
				Local Community
			</h6>
			<PostsAll />
			<Tooltip title='Previous'>
				<button
					className=' bg-emerald-400 text-md font-light hover:bg-blue-600 md:p-2 md:ps-16 p-2 md:hover:ps-20 md:hover:pt-2 pt-3 md:hover:pb-2 pb-3 hover:pb-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed md:bottom-24 md:left-0 bottom-0 left-60 md:z-0 z-50'
					onClick={handleGoBackClick}
				>
					Back
				</button>
			</Tooltip>
		</div>
	);
};

export default Community;
