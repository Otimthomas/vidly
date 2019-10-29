import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
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

					{!user && (
						<React.Fragment>
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
						</React.Fragment>
					)}
					{user && (
						<React.Fragment>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/profile'>
									{user.name}
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/logout'>
									LogOut
								</NavLink>
							</li>
						</React.Fragment>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
