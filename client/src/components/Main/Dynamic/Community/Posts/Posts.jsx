import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { PostsContext } from '../../../../../context/Posts';
import { useContext } from 'react';

const PostsAll = () => {
	const { posts } = useContext(PostsContext);
	return (
		<div className='bg-cyan-100 dark:bg-gray-800 dark:text-white text-gray-800 p-6'>
			{posts.map((post) => (
				<Card
					key={post._id}
					className='ms-2 mb-14 bg-sky-100 dark:bg-gray-700'
				>
					<h3 className='text-xl font-semibold'>{post.title}</h3>
					<p>{post.text}</p>
					<p className='font-light text-xs'>
						Posted by: {post.userId.userName}
					</p>
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
						to={`/posts/${post._id}`}
						className='text-blue-600 hover:underline'
					>
						View Post
					</Link>
				</Card>
			))}
		</div>
	);
};

export default PostsAll;
