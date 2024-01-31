/* eslint-disable react/prop-types */
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
	return (
		<Card className='mb-4 text-gray-800 dark:text-white dark:bg-gray-600 shadow-none border-none'>
			<h3 className='text-lg font-semibold'>{post.title}</h3>
			<p className='text-xs'>Posted by: {post.userId.userName}</p>
			<p className='text-sm'>{post.text}</p>
			{post.comments.length > 0 && (
				<div>
					{post.comments.map((comment) => (
						<div key={comment._id}>
							<p>Commented by: {comment.userId.userName}</p>
							<p>{comment.text}</p>
						</div>
					))}
				</div>
			)}
			<Link
				to={`home/posts/${post._id}`}
				className='text-blue-600 hover:underline text-sm'
			>
				View Post
			</Link>
		</Card>
	);
};

export default PostCard;
