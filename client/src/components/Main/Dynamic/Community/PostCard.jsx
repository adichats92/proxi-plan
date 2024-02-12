/* eslint-disable react/prop-types */
const PostCard = ({ post }) => {
	return (
		<div
			className='relative mt-12 h-80 w-full overflow-hidden text-white bg-right bg-cover'
			style={{ backgroundImage: `url(${post.imageUrl})` }}
		>
			<div className='absolute flex flex-col justify-center items-center bg-gray-800 bg-opacity-60 left-0 h-80 w-dvw top-0 w-2/3 backdrop-blur-lg p-4'>
				<h3 className='text-lg font-bold overflow-hidden text-emerald-400 text-ellipsis whitespace-nowrap'>
					{post.title}
				</h3>
				<p className='text-sm line-clamp-4 overflow-hidden max-w-96'>
					{post.text}
				</p>
				<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
			</div>
		</div>
	);
};

export default PostCard;
