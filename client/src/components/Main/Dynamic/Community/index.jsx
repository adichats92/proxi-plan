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
					className=' bg-emerald-400 hover:bg-blue-600 hover:ps-12 transition-all duration-900 ease-in-out border-none rounded-none text-white fixed top-72 left-0 px-4 py-3'
					onClick={handleGoBackClick}
				>
					{/* <ArrowBackRoundedIcon fontSize='medium' /> */}
					Back
				</button>
			</Tooltip>
		</div>
	);
};

export default Community;
