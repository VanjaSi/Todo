import { Link, NavLink } from 'react-router-dom';
function Header({ logo }) {
	return (
		<header className='header'>
			<Link to='/'>
				<img src={logo} className='logo' alt='logo' />
			</Link>

			<nav>
				<NavLink activeclassname='active' className='link-item' to='/'>
					Home
				</NavLink>
				<NavLink className='link-item' to='/add'>
					Add
				</NavLink>
			</nav>
		</header>
	);
}

export default Header;
