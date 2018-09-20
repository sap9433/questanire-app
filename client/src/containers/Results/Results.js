import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import './Results.css';
import _ from 'lodash';

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
			leaderboard: []
		};
	}

	getLeaderBoard(){
		const url = `/api/leaderboard`;
	    ajax.getJSON(url)
	    .subscribe(
	        data => {
	          if(data.error){
	            this.setState({
	              error: data.error
	            })
	          } else{
	          	let leaderboard = data.msg.map((row) => {
	          		row = row.split('|');
	          		return {
	          			data: row, 
	          			val: -1 * parseFloat(row.slice(-1)[0]),
	          			time: new Date(row[2])
	          		};
	          	});
	          	leaderboard = _.sortBy(leaderboard, ['val']);
	            this.setState({leaderboard});
	          }
	        },
	        err => this.setState({ startTestError: JSON.stringify(err) })
	    );
	    setTimeout(this.getLeaderBoard.bind(this), 18000);
	}

	componentDidMount = () => {
	    this.getLeaderBoard();
  	};

	render() {
  	return (
			<Fragment>
				<Grid container spacing={40} className='result_wrapper'>
					<Grid 
						className="challenge"
						item 
						xs={12}
						>
						{this.state.leaderboard.map((user, i) =>{
							return(
								<div className='leader_row'>
									<span className='name'>{user.data[0]}</span>
									<span className='email'>{ user.data[1]}</span>
									<span className='time'>{ moment(new Date(user.data[2])).format('LLLL')}</span>
									<span className='marks'>{ user.data[3]}</span>
								</div>
							)
						})}
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

Results.propTypes = {
	routeParams: PropTypes.object, // eslint-disable-line
};
