/* eslint-disable react/prop-types */

const PostCard = ({ post }) => {
	return (
		<div className='mt-4 text-gray-800 bg-transparent shadow-none border-none flex flex-row justify-center items-center'>
			<div className='m-2 p-4'>
				<h3 className='text-lg font-bold'>{post.title}</h3>
				<p className='text-sm'>{post.text}</p>
				<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
			</div>
			{post.imageUrl && (
				<div className='m1'>
					<img
						src={post.imageUrl}
						alt='image'
						className='h-56 w-56'
					/>
				</div>
			)}
		</div>
	);
};

export default PostCard;
