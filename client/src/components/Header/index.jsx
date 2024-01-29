import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { Avatar, Button, Dropdown, Navbar, Tooltip } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
function Header() {
	const { user, logout } = useContext(AuthContext);

	return (
		<header>
			<Navbar className='flex-row justify-between bg-cyan-700 dark:bg-black'>
				<NavLink to={'/home'}>
					<img
						src='/PPNoBg.png'
						className='h-6 sm:h-9'
						alt='Logo'
					/>
				</NavLink>
				{user ? (
					<>
						<div className='flex '>
							<Dropdown
								arrowIcon={false}
								inline
								label={
									<Avatar
										alt='User settings'
										img='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
										rounded
									/>
								}
							>
								<Dropdown.Header className='px-8'>
									<span className='block text-sm pt-1 pe-2 my-2'>
										Hello {user.userName}
									</span>
									<span className='block truncate text-sm font-medium py-1 pe-2 my-2'>
										{user.email}
									</span>
									<hr />
									<ul className='my-3 pe-2'>
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
												to={'home/todos'}
												className='py-3 mt-3'
											>
												Todos
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'home/community'}
												className='py-1 mt-1'
											>
												Community
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'home/map'}
												className='py-1'
											>
												Map
											</NavLink>
										</li>
										<li>
											<NavLink
												to={'home/news'}
												className='pt-1'
											>
												News
											</NavLink>
										</li>
									</ul>
									<Tooltip content='See you later!'>
										<Button
											onClick={logout}
											className='mt-3 px-3'
										>
											Logout
										</Button>
									</Tooltip>
								</Dropdown.Header>
							</Dropdown>
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
				<DarkThemeToggle className='bg-neutral-200 dark:bg-gray-500 text-black dark:text-white rounded-full' />
			</Navbar>
		</header>
	);
}

export default Header;
