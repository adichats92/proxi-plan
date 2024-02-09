import PostsAll from './Posts/PostsAll';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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
			<button
				className=' bg-emerald-400 hover:bg-blue-600 border-none rounded-lg text-white fixed top-72 left-2 px-4 py-3'
				onClick={handleGoBackClick}
			>
				<ArrowBackRoundedIcon fontSize='medium' />
			</button>
		</div>
	);
};

export default Community;
