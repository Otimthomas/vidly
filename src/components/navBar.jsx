import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<Link className='navbar-brand' to='/movies'>
				Vidly
			</Link>

			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				<ul className='navbar-nav mr-auto'>
					<li className='nav-item'>
						<NavLink className='nav-item nav-link' to='/movies'>
							Movies
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-item nav-link' to='/rentals'>
							Rentals
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/customers'>
							Customers
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/login'>
							Login
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/register'>
							Register
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;