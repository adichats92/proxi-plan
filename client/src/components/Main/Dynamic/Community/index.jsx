import PostsAll from './Posts/PostsAll';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
const Community = () => {
	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};
	return (
		<div className='dark:bg-gray-800'>
			<h6 className='text-center font-bold text-2xl text-cyan-500 dark:text-white p-6 mb-6'>
				Local Community
			</h6>
			<PostsAll />

			<ArrowBackRoundedIcon
				onClick={handleGoBackClick}
				className='fixed right-2 bottom-48 text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer'
				fontSize='large'
			/>
		</div>
	);
};

export default Community;
