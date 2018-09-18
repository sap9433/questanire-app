import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Grid,
  Button,
	TextField,
	InputAdornment
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { loadAllTests } from '../../actions/assesmentAction';
import { setItem, getItem } from '../../helpers/localStorage';
import TrainLinkModal from '../../components/Modals/TrainLinkModal/TrainLinkModal';
import corporate from '../../images/corporate.png';
import cover from '../../images/cover.png';
import './Dashboard.css';
import SearchIcon from '@material-ui/icons/Search';
import TestCard from '../../components/TestCard';
import Alert from '../../components/Alert';

const READY_CARD = 'READY_CARD';
const INCOMPLETE_CARD = 'INCOMPLETE_CARD';
const TRAINING_CARD = 'TRAINING_CARD';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.modalTrainLinkSelected = this.modalTrainLinkSelected.bind(this)

    this.state = {
      show: false,
      showAlert: false,
      showModal: false,
      modalTrainLink: 'this is the link',
      editingStatus: {},
      tab: 0,
      filterText: ''
    };

    this.uname = 1;
  }

  componentDidMount() {
    this.props.loadAllTests();
    if (getItem('firstlogin') === 'true') {
      setItem('firstlogin', 'false');
      this.setState({ showAlert: true });
    }
  }

  handleShow() {
    this.setState({
      show: true
    });
    this.props.history.push('/createtest');
  }

  handleHide() {
    this.setState({
      show: false,
      modalTrainLink: this.modalTrainLinkSelected(undefined)
    });
  }

  handleDismiss() {
    if (this.state.showAlert) {
      this.setState({ showAlert: false });
    }
  }

  modalTrainLinkSelected(testId) {
    console.log({modalTrainLinkSelected: testId,
      testId: testId
    })
    if (testId) {
      return `${window.location.host}/enter/${testId}`
    } else {
      return 'this is the link'
    }
  }

  validTitle = (desc, limit) => {
    if (desc && desc.length > limit) {
      return desc.slice(0, limit) + ' ...';
    }
    return desc || `Uname ${this.uname ++}`;
  }

  handleClickCard(testId, cardType) {
    switch (cardType) {
      case INCOMPLETE_CARD:
        this.props.history.push(`/createtest/${testId}/own/2/1`);
        break;
      case TRAINING_CARD:
        this.setState({ showModal: true, modalTrainLink: this.modalTrainLinkSelected(testId) });
        break;
      case READY_CARD:
        this.props.history.push(`/results/${testId}`);
        break;
      default:
    }
  }

  handleSelectTitle = (event) => {
    event.stopPropagation();
  }

  handleHideAlert = () => {
    if (this.state.showAlert) {
      this.setState({ showAlert: false });
    }
  }

  handleChangeTab = (tabkey) => {
    this.setState({ tab: tabkey });
  }

  handleSearch = event => {
    this.setState({ filterText: event.target.value });
  }

  renderAlert = () => {
    const { user } = this.props;
    return (
      <Alert
        variant="success"
        className="alertBox"
        message={`Hello ${user.name}, This is your dashboard!`}
        onClose={this.handleHideAlert}
        onClick={this.handleHideAlert}
      />
    );
  }

  render() {
    const { testlist = [], user } = this.props;
    const { tab, filterText } = this.state;
    this.uname = 1;
    return (
      <div className='dashboard'> 
        <Grid container spacing={24}>
          <Grid 
            className="dashboard_header"
            item 
            xs={12}
          >
            <div className="leftPanel">
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
            </div>

            <div className='addMember' >
              <Button  
                className="createnew__but"
                variant="contained" 
                color="primary" 
                onClick={this.handleShow}
              >
                <Add />
                &nbsp;Create Challenge
              </Button>
            </div>
          </Grid>

          <Grid 
            className="card_container"
            container 
            spacing={24}
          >
          {
            <Grid item xs={12} md={4}>
              <div className='ImgCard'>
                <TestCard
                  image={corporate}
                  title={"Getting Started - Your Guide"}
                  time=""
                />
              </div>
            </Grid>
          }
          {
            <Grid item xs={12} md={4}>
              <div 
                className='ImgCard'
                onClick={() => this.handleClickCard('4352345324', READY_CARD)}
              >
                <TestCard
                  image={cover}
                  title="Your First Campaign"
                  time="Aug 19, 2018"
                  removable
                />
              </div>
            </Grid>
          }
          {
            testlist && testlist.map((eachtest, ind) => {
              const { createdBy, details = {}, } = eachtest;
              const testId = eachtest._id;
              const cardType = details.cards === undefined ? INCOMPLETE_CARD : TRAINING_CARD;
              if (!this.validTitle(details.testName, 25).toLowerCase().includes(filterText.toLowerCase()))
                return;
              return (createdBy === user.user_id) ?
                (
                  <Grid item xs={12} md={4} key={ind}>
                    <div 
                      className='ImgCard'
                      onClick={() => this.handleClickCard(testId, cardType)}
                    >
                      <TestCard 
                        image={cover}
                        title={this.validTitle(details.testName, 25)}
                        time="Aug 19, 2018"
                        removable
                      />
                    </div>
                  </Grid>
                ) : null;
            })
          }
          </Grid>
        </Grid>
        <TrainLinkModal
          trainlink={this.state.modalTrainLink}
          show={this.state.showModal} 
          onHide={() => { this.setState({ showModal: false }); }}
        />
      </div>
    ); 
  }
}

Dashboard.propTypes = {
  testlist: PropTypes.array,
  loading: PropTypes.bool,
  loadAllTests: PropTypes.func,
};


const mapStateToProps = state => {
  return {
    testlist: state.assesments.testlist,
    loading: state.assesments.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadAllTests
  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
