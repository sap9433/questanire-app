import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import Alexa from '../../images/alexa.jpg';
import Car from '../../images/car.jpg';
import Bottom from '../../images/bottom.png';
import Naspp from '../../images/conf.jpeg';

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
			leaderboard: [],
			count: 5
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
				<div className='result_wrapper'>
					<div className="header"> Certent Challenge Quiz <div className="lboard"> Equity Knowledge LEADERBOARD </div> </div>
					<div>
						 <img className='certentLogo' src={Bottom} alt="logo"/>
					</div>
					<div className='car'>
						 <img src={Car} alt="car"/>
					</div>
					<div className='alexa'>
						 <img src={Alexa} alt="alexa"/>
					</div>
					<div className="challenge"
						>
						{this.state.leaderboard.slice(0,this.state.count).map((user, i) =>{
							return(
								<div className='leader_row'>
									<span className='countn'> {i+1}. </span>
									<span className='name'>{user.data[0]}</span>
									<span className='elapsed'>{`Took ${user.data[4]} sec at ${moment(user.data[2]).format('hh:mm A')}` } </span>
									<span className='marks'>{ user.data[3] * 100}%</span>
								</div>
							)
						})}
					</div>
					<div>
						 <img className='naspp' src={Naspp} alt="naspp"/>
					</div>
				</div>
			</Fragment>
		);
	}
}

Results.propTypes = {
	routeParams: PropTypes.object, // eslint-disable-line
};
