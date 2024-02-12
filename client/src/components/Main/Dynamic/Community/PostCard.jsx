/* eslint-disable react/prop-types */

// const PostCard = ({ post }) => {
// 	return (
// 		<div className='mt-4 text-gray-800 bg-transparent shadow-none border-none flex flex-row justify-center items-center'>
// 			<div className='m-2 p-4'>
// 				<h3 className='text-lg font-bold'>{post.title}</h3>
// 				<p className='text-sm'>{post.text}</p>
// 				<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
// 			</div>
// 			{post.imageUrl && (
// 				<div className='m1'>
// 					<img
// 						src={post.imageUrl}
// 						alt='image'
// 						className='h-56 w-56'
// 					/>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default PostCard;
const PostCard = ({ post }) => {
	return (
		<div
			className='relative mt-12 h-80 w-full overflow-hidden text-white bg-right bg-cover'
			style={{ backgroundImage: `url(${post.imageUrl})` }}
		>
			{/* Overlay to blur the right part of the image */}
			{/* <div className='absolute right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-white/30 backdrop-blur'></div> */}

			{/* Text container */}
			<div className='absolute bg-gray-800 bg-opacity-60 left-0 h-80 w-dvw top-0 w-2/3 backdrop-blur-lg p-4'>
				<h3 className='text-lg font-bold overflow-hidden text-emerald-400 text-ellipsis whitespace-nowrap'>
					{post.title}
				</h3>
				<p className='text-sm line-clamp-4 overflow-hidden'>{post.text}</p>
				<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
			</div>
		</div>
	);
};

export default PostCard;
