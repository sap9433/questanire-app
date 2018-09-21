import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import {
	Button,
	AppBar,
	Toolbar,
	Grid,
	IconButton
} from '@material-ui/core';

class Header extends Component {

  render () {
		const { user } = this.props;
		return (
	    <Grid>
				<AppBar className="AppBar" color="default" position="static">
					<Toolbar eventkey={0} isopen={user} className='navbarItem'>
						<IconButton 
							className="brand" 
							color="inherit" 
							aria-label="Logo"
						/>
						<div className="nav__icons">
							{user &&
								<div className="profile__but" eventkey={6}>
									<Button href="/register/login"><strong>Hi, {user.name}!</strong></Button>
								</div>
							}
							{!user &&
								<Link to='#'>
									<Button 
										className="register_but"
										eventkey={6}
									>
										Register/Login
									</Button>
								</Link>
							}
						</div>
					</Toolbar>
		    </AppBar>	
		  </Grid> 
	  )
  }
}

export default Header;