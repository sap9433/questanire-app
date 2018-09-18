import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Avatar,
  Chip,
  Button,
	ExpansionPanel,
	ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper,
  Divider,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './SliderPane.css';

const IS_EMPLOYER  = false;
const IS_CANDIDATE = true;

class SliderPane extends Component {
  render() {
    const { title, subtitle, isOpen, onClose, tableData, paneType } = this.props;

    return (
      <SlidingPane
        className={'SliderPane'}
        overlayClassName={'SliderOverlay'}
        isOpen={ isOpen }
        title={title}
        subtitle={subtitle}
        onRequestClose={ () => { onClose(); } }
        >
        
        <div>
          <div className='SlidingPaneContent'>
            <div className="SlideHeaderWrapper">
              <TextField
                className="search__bar"
                onChange={this.handleSearch}
                id="input-with-icon-textfield"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <div className="SlideHeader">
                <div className="candidate_info">
                  <Typography variant="title">
                    {tableData.fullname}
                  </Typography>
                  <Typography
                    className="candidate_timestamp"
                    component="p"
                  >
                    Added July 10, 2018
                  </Typography>
                </div>
                <div className="candidate_score">
                  <Avatar className="score__circle">{tableData.score}</Avatar>
                </div>
              </div>

              <Typography
                className="candidate_text"
                component="p"
              >
                <div className="highlight">{tableData.fullname}'s</div>
                &nbsp;performance fits best as a&nbsp;
                <div className="highlight">Business Analyst</div>
                &nbsp;for a&nbsp;
                <div className="highlight">technology</div>
                company like&nbsp;
                <div className="highlight">IBM</div>
                &nbsp;-&nbsp;
                <div className="highlight">Digital Business Channels</div>
              </Typography>

              <Divider className="content_divider" />

              <Typography className="content_header">
                <strong>
                  Key Themes
                </strong>
              </Typography>

              <Typography component="p">
                <Chip
                  label="Blockchain"
                  component="a"
                  className='feedTagPane'
                />{''}
                <Chip
                  label="Ethereum"
                  className="feedTagPane"
                  component="a"
                />{''}
                <Chip
                  label = "Bitcoin"
                  className = 'feedTagPane'
                  component = "a"
                />{''}
              
                <Chip
                  label = "Security Token"
                  component = "a"
                  className = 'feedTagPane'
                />{''}
                <Chip
                  label="Cryptography"
                  className='feedTagPane'
                  component="a"
                />{''}
                <Chip
                  label="Blockchain business network"
                  className='feedTagPane'
                  component="a"
                />{''}
              </Typography>
            </div>

            <Divider className="content_divider" />

            <Typography className="content_header">
              <strong>
                Challenge Responses
              </strong>
            </Typography>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <strong>
                  Problem
                </strong>
              </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                <div className="testdetail">
                  <p className="timespent">5:10</p>
                  <Avatar className="scoredetail">
                    <div className="scoredetail_number">
                      63
                    </div>
                  </Avatar>
                </div>
                <div>
                  As the global trend towards purchasing via the Internet leads towards a multitude of smaller
                  shipments mostly posted via international or express mail, the importance of a strong Customs 
                  Program has never been so important. React can assist you by having the right Customs 
                  Applications in place as well as handling all seizure cases, including all communication, sampling, 
                  and storage, recycling or destruction.
                </div>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>Collecting Information</strong></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>Engendering Ideas</strong></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>Recommending a Solution</strong></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>

          <Divider className="content_divider" />

          { 
            paneType === IS_EMPLOYER &&
            <div className='feedbackForm'>
              <Typography className="content_header">
                <strong>
                  Feeedback
                </strong>
              </Typography>
              <textarea
                placeholder="Add Feedback"
                className='form-control feedbackText'
              />
              <Button variant="contained" color="primary">
                <strong>
                  Send
                </strong>
              </Button>
            </div>
          }

          {
            paneType === IS_CANDIDATE && 
            <Paper className="feedbackWrapper" elevation={1}>
              <Typography variant="headline" component="h3">
                Feeedback
              </Typography>
              <Typography component="p">
                This candidate is familiar with our company and showed interest in learning more 
                about our upcoming projects. Considering [Hiring manager’s] notes about the candidate’s 
                performance on the assignment, I think [he/she] will be a very good fit for this role 
                and the company in general.
              </Typography>
            </Paper>
          }
          
        </div>

      </SlidingPane>
    );
  }
}

SliderPane.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SliderPane;
