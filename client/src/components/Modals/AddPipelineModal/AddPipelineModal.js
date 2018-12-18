import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Modal,
  Button,
  TextField,
  Switch
} from '@material-ui/core';
import './AddPipelineModal.css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class AddPipelineModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pipName: '',
      benchmark: true
    }
  }

  handleAdd = () => {
    const { pipName, benchmark } = this.state;
    this.props.onAdd(pipName, benchmark);
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleChangeSwitch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { show } = this.props;
    return (
      <Modal
        className="AddPipeline"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={show}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={'paper'}>
          <Typography variant="title" id="modal-title">
            Add Pipeline
          </Typography>
          <div className="pipeline_data">

            <TextField
              id="pip_name"
              className="pip_name"
              label="Input Name"
              value={this.state.pipName}
              onChange={this.handleChange('pipName')}
              margin="normal"
            />

            <span>Benchmark</span>

            <Switch
              className="benchmark_switch"
              color="secondary"
              checked={this.state.benchmark}
              onChange={this.handleChangeSwitch('benchmark')}
              value="checkedB"
              disableRipple
            />
          </div>
          <div className="form">
            <Button
              className="start_but"
              variant="contained"
              color="default"
              onClick={this.handleAdd}
            >
              Add
            </Button>

            <Button
              className="cancel_but"
              variant="contained"
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

AddPipelineModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
};

export default AddPipelineModal;