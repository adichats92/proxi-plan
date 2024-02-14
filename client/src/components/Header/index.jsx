import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import Radio from '../Main/Sidebar/Radio';

function Header() {
	const { user, logout } = useContext(AuthContext);

	const capitalizeFirstLetter = (string) => {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<>
			{user ? (
				<>
					<div className='navbar bg-black bg-opacity-80 backdrop-blur-xl px-6 fixed top-0 z-50'>
						<div className='flex-1'>
							<NavLink to={'/home'}>
								<img
									src='/PPNoBg.png'
									className='h-6 sm:h-9'
									alt='Logo'
								/>
							</NavLink>
						</div>

						<Radio />
						<div className='mx-5'>
							<ul
								className='list-none md:flex md:flex-row justify-center items-center gap-4 text-white'
								hidden
							>
								<li>
									<NavLink
										to={'home/community'}
										className='py-2 mt-1 hover:text-purple-400 transition-all duration-900 ease-in-out'
									>
										Community
									</NavLink>
								</li>
								<li>
									<NavLink
										to={'home/news'}
										className='pt-2 hover:text-purple-400 transition-all duration-900 ease-in-out'
									>
										News
									</NavLink>
								</li>
							</ul>
						</div>
						<div className='flex-none gap-2'>
							<div className='dropdown dropdown-end'>
								<div
									tabIndex={0}
									role='button'
									className='btn btn-ghost btn-circle avatar'
								>
									<div className='w-10 rounded-full'>
										<img
											alt='Profile picture'
											src={user.image ? user.image : '/dpdef.jpg'}
										/>
									</div>
								</div>
								<ul
									tabIndex={0}
									className='mt-3 z-[1] text-white p-2 shadow menu menu-sm dropdown-content bg-black bg-opacity-60 backdrop-blur-lg rounded-box w-52'
								>
									<li className='text-center m-2 block text-sm pt-1 pe-2 my-2'>
										Hello {capitalizeFirstLetter(user.userName)}!{' '}
									</li>
									<li>
										<Link
											to='/home/profile'
											className='justify-between'
										>
											Profile
											<PersonIcon
												fontSize='small'
												className='me-1'
											/>
										</Link>
									</li>
									<li>
										<Link
											to='/home/user'
											className='justify-between'
										>
											Settings{' '}
											<SettingsIcon
												fontSize='small'
												className='me-1'
											/>
										</Link>
									</li>
									<li>
										<Tooltip title='See you soon!'>
											<Link
												onClick={logout}
												className='justify-between'
											>
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
				<div className='navbar bg-black bg-opacity-60 backdrop-blur-lg px-6 fixed top-0 z-50'>
					<div className='flex-1'>
						<img
							src='/PPNoBg.png'
							className='h-6 sm:h-9'
							alt='Logo'
						/>
					</div>
					<NavLink
						to={'/login'}
						className='m-2 text-white hover:underline dark:text-cyan-500'
					>
						Login
					</NavLink>
					<NavLink
						to={'/register'}
						className='m-2  text-white hover:underline dark:text-cyan-500'
					>
						Register
					</NavLink>
				</div>
			)}
		</>
	);
}

export default Header;
