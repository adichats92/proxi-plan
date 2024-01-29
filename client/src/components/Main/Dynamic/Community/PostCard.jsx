import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
	return (
		<Card className='mb-4 dark:bg-zinc-400'>
			<h3 className='text-lg font-semibold'>{post.title}</h3>
			<p>Posted by: {post.userId.userName}</p>
			<p>{post.text}</p>
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
				className='text-blue-600 hover:underline'
			>
				View Post
			</Link>
		</Card>
	);
};

export default PostCard;
