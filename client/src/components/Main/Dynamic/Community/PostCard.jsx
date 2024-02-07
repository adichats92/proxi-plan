/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';

const PostCard = ({ post }) => {
	return (
		<Card className='mt-4 text-gray-800 dark:text-white dark:bg-transparent bg-transparent shadow-none border-none'>
			<h3 className='text-lg font-bold'>{post.title}</h3>
			<p className='text-sm'>{post.text}</p>
			<p className='text-xs font-thin'>Posted by: {post.userId.userName}</p>
		</Card>
	);
};

export default PostCard;
