import React, { Component } from 'react';
import axios from 'axios';

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

    axios.post('http://localhost:5000/clients/add', client)
      .then(res => console.log(res.data));

    this.setState({
      clientName: ''
    })
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
      </div>
    )
  }
}