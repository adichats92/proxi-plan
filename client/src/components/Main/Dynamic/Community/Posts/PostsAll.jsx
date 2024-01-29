import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { PostsContext } from '../../../../../context/Posts';
import { useContext } from 'react';

const PostsAll = () => {
	const { posts } = useContext(PostsContext);
	return (
		<div
			className='bg-neutral-100 dark:bg-gray-800 dark:text-neutral-300 overflow-auto p-6'
			style={{ height: '93vh' }}
		>
			<h6 className='text-center font-bold text-2xl text-cyan-300 p-6'>
				Discover Local Stories
			</h6>
			{posts.map((post) => (
				<Card
					key={post._id}
					className='ms-2 mb-4 bg-sky-100 dark:bg-zinc-700'
				>
					<h3 className='text-xl font-semibold'>{post.title}</h3>
					<p className='font-light text-xs'>
						Posted by: {post.userId.userName}
					</p>
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
