import PostsAll from './Posts/Posts';
import CreatePost from './Posts/CreatePost';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
const Community = () => {
	const navigate = useNavigate();
	const handleGoBackClick = () => {
		navigate(-1);
	};
	return (
		<div className='dark:bg-gray-800'>
			<h6 className='text-center font-bold text-2xl text-cyan-500 p-6 mb-6'>
				Discover Local Stories
			</h6>
			<CreatePost />
			<PostsAll />

			<ArrowBackRoundedIcon
				onClick={handleGoBackClick}
				className='absolute left-50 top-16 text-large my-6 mx-4 text-sky-400 hover:text-emerald-400 dark:hover:text-emerald-700 hover:cursor-pointer'
			/>
		</div>
	);
};

export default Community;