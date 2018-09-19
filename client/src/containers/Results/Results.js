import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import './Results.css';

import {
	Grid,
	Typography,
	Paper,
	Button,
	Tooltip,
	Icon,
} from '@material-ui/core';

export default class Results extends Component {
	constructor(props) {
		super(props); // eslint-disable-line
		this.state = { // eslint-disable-line
			isPaneOpen: false, // eslint-disable-line
			stepvalue: 1, // eslint-disable-line
			open: false,
			showPipModal: false,
			pipelines: [{ title: 'Digital business team', benchmark: true }],
		};

		this.tableData = {
			fullname: '',
			score: 0
		};
	}

	render() {
  	return (
			<Fragment>
				<Grid container spacing={40} className='result_wrapper'>

					<Grid 
							className="challenge"
							item 
							xs={12}
						>
						Lo karlo baat 
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

Results.propTypes = {
	routeParams: PropTypes.object, // eslint-disable-line
};
