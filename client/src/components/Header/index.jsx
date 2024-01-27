import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
function Header() {
	const { user, logout } = useContext(AuthContext);

	return (
		<header className='header'>
			<img
				src='./logoW.png'
				alt='Logo'
			/>
			<nav>
				<div>
					<NavLink
						className='nav-link'
						to={'/home'}
					>
						Home
					</NavLink>
					<span> | </span>
					<NavLink
						className='nav-link'
						to={'/posts'}
					>
						Community
					</NavLink>
				</div>
				<>
					{user ? (
						<div className='header-user'>
							<p>Hello {user.userName}!</p>
							<button onClick={logout}>Logout</button>
						</div>
					) : (
						<div className='header-user'>
							<NavLink
								className='nav-link'
								to={'/login'}
							>
								Login
							</NavLink>

							<NavLink
								className='nav-link'
								to={'/register'}
							>
								Register
							</NavLink>
						</div>
					)}
				</>
			</nav>
		</header>
	);
}

export default Header;
