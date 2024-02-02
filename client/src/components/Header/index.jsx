import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { DarkThemeToggle } from 'flowbite-react';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { Tooltip } from '@mui/material';

function Header() {
	const { user, logout } = useContext(AuthContext);

	return (
		<>
			{user ? (
				<>
					<div className='navbar bg-cyan-700 dark:bg-black px-6'>
						<div className='flex-1'>
							<NavLink to={'/home'}>
								<img
									src='/PPNoBg.png'
									className='h-6 sm:h-9'
									alt='Logo'
								/>
							</NavLink>
						</div>
						<div className='mx-5'>
							<ul
								className='list-none md:flex md:flex-row justify-center items-center gap-4'
								hidden
							>
								<li>
									<NavLink
										to={'/home'}
										className='py-3 mt-3'
									>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'home/community'}
										className='py-2 mt-1'
									>
										Community
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'home/map'}
										className='py-2'
									>
										Map
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'home/news'}
										className='pt-2'
									>
										News
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'home/weather'}
										className='pt-2'
									>
										Weather
									</NavLink>
								</li>
							</ul>
						</div>
						<div className='flex-none gap-2'>
							<DarkThemeToggle className='bg-neutral-200 dark:bg-gray-500 text-black dark:text-white rounded-full' />
							<div className='dropdown dropdown-end'>
								<div
									tabIndex={0}
									role='button'
									className='btn btn-ghost btn-circle avatar'
								>
									<div className='w-10 rounded-full'>
										<img
											alt='Tailwind CSS Navbar component'
											src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
										/>
									</div>
								</div>
								<ul
									tabIndex={0}
									className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
								>
									<li className='block text-sm pt-1 pe-2 my-2'>
										Hello {user.userName}!
									</li>
									<li>
										<Link className='justify-between'>
											Profile
											<span className='badge'>New</span>
										</Link>
									</li>
									<li>
										<Link>Settings</Link>
									</li>
									<li>
										<Tooltip title='See you soon!'>
											<Link onClick={logout}>
												Signout{' '}
												<MeetingRoomRoundedIcon
													fontSize='small'
													className='me-1'
												/>
											</Link>
										</Tooltip>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='flex-row justify-between text-emerald-50 sm:pe-44'>
					<NavLink
						to={'/login'}
						className='m-2 text-cyan-600 hover:underline dark:text-cyan-500'
					>
						Login
					</NavLink>
					<NavLink
						to={'/register'}
						className='m-2  text-cyan-600 hover:underline dark:text-cyan-500'
					>
						Register
					</NavLink>
				</div>
			)}
		</>
	);
}

export default Header;
