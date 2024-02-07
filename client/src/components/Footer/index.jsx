import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='bg-black bg-opacity-60 backdrop-blur-lg bottom-0 right-0 left-0 p-7 w-full z-30'>
			<div className='w-full max-h-32 mx-auto max-w-screen-xl p-1 flex shrink items-center md:justify-between'>
				<span className='text-sm text-white text-center mt-3 sm:mt-0 sm:text-center dark:text-gray-400'>
					© 2024{' '}
					<Link
						to={'/home'}
						className='hover:underline'
					>
						Proxiplan™
					</Link>
					. All Rights Reserved.
				</span>
				<ul className='flex flex-wrap items-center ms-2 mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0'>
					<li>
						<Link
							to='#'
							className='hover:underline me-4 md:me-6'
						>
							About
						</Link>
					</li>
					<li>
						<Link
							to='#'
							className='hover:underline me-4 md:me-6'
						>
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link
							to='#'
							className='hover:underline me-4 md:me-6'
						>
							Licensing
						</Link>
					</li>
					<li>
						<Link
							to='#'
							className='hover:underline'
						>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
