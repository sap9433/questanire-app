import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Add } from '@material-ui/icons';
import ScatterPlot from './ScatterPlot';
import CopyInput from '../../components/CopyInput';
import TopTabs from './Tabs/Tabs.js';
import './Results.css';

import {
	Grid,
	Typography,
	Paper,
	Button,
	Tooltip,
	Icon,
} from '@material-ui/core';
import SliderPane from '../../components/SliderPane';
import AddPipelineModal from '../../components/Modals/AddPipelineModal';
import PipeLine from '../../components/PipeLine';

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

	componentDidMount = () => {
		Modal.setAppElement(this.el); // eslint-disable-line
	};

	handleStepChange = (event) => {
		event.preventDefault(); // eslint-disable-line
		this.setState({ // eslint-disable-line
			stepvalue: Math.random(), // eslint-disable-line
		});
	}

	handleChangeTab = value => {
		this.setState({ tabValue: value });
	}

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}
		this.setState({ open: false });
	};

	handleClickAddPipeline = () => {
		this.setState({ showPipModal: true });
	}
	
	handleAddPipeline = (title, benchmark) => {
		console.log(title, benchmark);
		this.setState({ pipelines: [...this.state.pipelines, { title, benchmark }] });
		this.setState({ showPipModal: false });
	}

	handleRemovePipeline = (index) => {
		const { pipelines } = this.state;
		pipelines.splice(index, 1);
		this.setState({ pipelines });
	}

	showSlidePane = (name, score) => {
		this.tableData = { fullname: name, score: score };
		this.setState({ isPaneOpen: true });
	}

	render() {
		Modal.setAppElement(this.el); // eslint-disable-line
		const { match: { params: { resultId } } } = this.props;
		const { pipelines } = this.state;
		console.log(pipelines);
  	return (
			<Fragment>
				<Grid container spacing={40} className='result_wrapper'>

					<Grid container>
						<Grid 
							className="challenge"
							item 
							xs={6}
						>
							<Typography
								className="challenge_header"
								variant="headline" 
								component="h4"
							>
								Team Performance Challenge
							</Typography>
							<Typography
								className="challenge_timestamp"
								component="p"
							>
								Created July 10, 2018
							</Typography>
							<textarea
							  className='challenge_desc'
                placeholder="Add Add your challenge objective/description here. Everyone on the team will be able to see this!"
              />
						</Grid>
						<Grid item xs={6}>
							<Button
                className="add_pipeline_but"
                variant="contained"
								color="default"
                onClick={this.handleClickAddPipeline}
              >
								<Add />
								&nbsp;Add Pipeline
							</Button>
						</Grid>
					</Grid>
				
					<Grid
						className="pipeline_wrapper"
						container
						spacing={40}
					>
					{
						pipelines.map((val, index) => {
							let width = 6;

							if (index == pipelines.length - 1 && index % 2 == 0) {
								width = 12;
						}
							return <PipeLine
											title={val.title}
											width={width}
											showSlide={this.showSlidePane}
											onRemove={this.handleRemovePipeline}
											key={index}
											benchmark
											expanded
										/>
						})
					}
					</Grid>

					<Grid
						className="relationship_card"
						item
						xs={12}
					>
						<Paper className='paper' elevation={1}>
							<Typography variant="headline" component="h4">
								Relationship Matrix
								<Tooltip title="Insights connecting top candidates with your employees">
									<Button className="helpIcon" aria-label="help">
										<Icon style={{ fontSize: 15 }}>help</Icon>
									</Button>
								</Tooltip>
							</Typography>
							<Typography component="p">
								Explore relationships between your employees and candidates
							</Typography>
							<br/><br/>
							<ScatterPlot stepvalue={this.state.stepvalue}/>
							<br/>
							<Grid
								container
								direction = "row"
								justify = "space-evenly"
								alignItems = "center"
							>
								<Button href="#" onClick={(event) => this.handleStepChange(event)}>Identifing Problem</Button>
								<Button href="#" onClick={(event) => this.handleStepChange(event)}>Collecting Information</Button>
								<Button href="#" onClick={(event) => this.handleStepChange(event)}>Engendering Ideas</Button>
								<Button href="#" onClick={(event) => this.handleStepChange(event)}>Recommending Solution</Button>
								<Button href="#" onClick={(event) => this.handleStepChange(event)}>Overall</Button>
							</Grid>
						</Paper>
					</Grid>
				</Grid>

				<SliderPane
					isOpen={ this.state.isPaneOpen }
					title=""
					subtitle=""
					paneType={false}
					tableData={this.tableData}
					onClose={() => {
						this.setState({ isPaneOpen: false }); // eslint-disable-line
					}}
				/>

				<AddPipelineModal 
					show={this.state.showPipModal}
					onAdd={this.handleAddPipeline}
					onCancel={() => this.setState({ showPipModal: false })}
				/>
		</Fragment>
		);
	}
}

Results.propTypes = {
	routeParams: PropTypes.object, // eslint-disable-line
};
