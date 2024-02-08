import { useContext } from 'react';
import { PostsContext } from '../../../../context/Posts';
import { Card } from 'flowbite-react';

const Profile = () => {
	const { posts } = useContext(PostsContext);

	return (
		<div className='mx-20 bg-white bg-opacity-0 backdrop-blur-md mt-32'>
			<div className=''>
				<h3 className='text-2xl text-center font-bold text-emerald-700 mb-4'>
					My Posts
				</h3>
				{posts.length > 0 ? (
					<>
						{posts.map((post) => (
							<Card
								key={post.id}
								className='flex mb-8 min-h-96 w-full p-4 bg-opacity-50 backdrop-blur-md border-none shadow-none justify-evenly items-center'
							>
								<h4 className='text-lg text-gray-800 font-semibold'>
									{post.title}
								</h4>
								<p>{post.text}</p>
								<span className='text-xs font-thin text-gray-500'>
									Posted on: {new Date(post.createdAt).toLocaleDateString()}
								</span>
							</Card>
						))}
					</>
				) : (
					<p>You have no posts yet.</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
