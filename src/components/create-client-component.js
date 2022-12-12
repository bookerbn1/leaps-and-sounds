import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CreateClient extends Component {
  constructor(props) {
    super(props);

    this.onChangeClientName = this.onChangeClientName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      clientName: ''
    }
  }

  onChangeClientName(e) {
    this.setState({
      clientName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const client = {
      clientName: this.state.clientName
    }

    console.log(client);

    axios.post(process.env.REACT_APP_SERVER_URL + 'clients/add', client)
      .then(res => console.log(res.data));

    this.setState({
      clientName: ''
    })
    toast.success('Client Successfully Created!');
  }

  render() {
    return (
      <div>
        <h3>Create New Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Client Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.clientName}
                onChange={this.onChangeClientName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Client" className="btn btn-primary" />
          </div>
        </form>
        <ToastContainer
                  closeButton={false}
                  theme="dark"
                  position="bottom-right"
                />
      </div>
    )
  }
}