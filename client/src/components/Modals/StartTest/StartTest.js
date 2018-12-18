import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Button } from '@material-ui/core';
import './StartTest.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class StartTest extends React.Component {
  constructor(props){
    super(props)
  }
  handleClose = () => {
    console.log('hello')
    this.props.onHide();
  };

  handleStart = () => {
    this.props.onStart();
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { show, startTestError } = this.props;
    return (
      <Modal
        className="startTest"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <div className="message">{startTestError}</div>
          <Typography variant="title" id="modal-title">
            Are you sure you want to start? When you click below, make sure you don't close the tab and keep your window full screen for maximum experience <br/>
          </Typography>
          <div className="form">
            <Button
              className="start_but"
              variant="contained"
              color="default"
              onClick={this.handleStart}
            >
              Start
            </Button>   

            <Button
              className="cancel_but"
              color="default"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </div>    
        </div>
      </Modal>
    );
  }
}

StartTest.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default StartTest;