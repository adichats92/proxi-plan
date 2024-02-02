/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';

const PostCard = ({ post }) => {
	return (
		<Card className='mb-4 text-gray-800 dark:text-white dark:bg-gray-800 shadow-none border-none'>
			<h3 className='text-lg font-semibold'>{post.title}</h3>
			<p className='text-xs'>Posted by: {post.userId.userName}</p>
			<p className='text-sm'>{post.text}</p>
		</Card>
	);
};

export default PostCard;
