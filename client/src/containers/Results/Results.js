import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Add } from '@material-ui/icons';
import moment from 'moment';
import Alexa from '../../images/alexa.png';
import Car from '../../images/car.png';
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
			count: 5,
			error: null
		};
	}

	getLeaderBoard(){
		const url = `/api/leaderboard`;
	    ajax.getJSON(url)
	    .subscribe(
	        data => {
	          if(data.error){
	            this.setState({
	              error: data.message
	            })
	          } else{
	            this.setState({leaderboard: data.msg});
	          }
	        },
	        err => this.setState({ startTestError: JSON.stringify(err) })
	    );
	    setTimeout(this.getLeaderBoard.bind(this), 15000);
	}

	componentDidMount = () => {
	    this.getLeaderBoard();
  	};

	render() {
		const {
	      match: { params: { count } }
	    } = this.props;

  	return (
			<Fragment>
				<div className='result_wrapper'>
					<div className="header"> Certent Challenge Quiz <div className="lboard"> Equity Knowledge LEADERBOARD </div> </div>
					<div>
						 <img className='certentLogo' src={Bottom} alt="logo"/>
					</div>
					<div className='prizes'>
						 Prizes
					</div>
					<div className='car'>
						 <img src={Car} alt="car"/>
					</div>
					<div className='alexa'>
						 <img src={Alexa} alt="alexa"/>
					</div>
					<div className="challenge"
						>
						{this.state.leaderboard.slice(0, count).map((user, i) =>{
							return(
								<div key={i} className='leader_row'>
									<div className='countn'> {i+1}. </div>
									<div className='name'>{_.truncate(_.startCase(user.data[0]), {'length': 20})}</div>
									<div className='elapsed'>{`${moment(user.data[2]).format('hh:mm A')}` } </div>
									<div className='marks'>
										<div className='stack'>{ user.data[4] * 100}%</div>
										<div className='time'>({ user.data[3]}s/qstn)</div>
									</div>
								</div>
							)
						})}
					</div>
					{this.state.error}
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
