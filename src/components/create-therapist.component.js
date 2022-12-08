import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTherapist extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const therapist = {
      name: this.state.name
    }

    console.log(therapist);

    axios.post('http://localhost:5000/therapists/add', therapist)
      .then(res => console.log(res.data));

    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Therapist</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Therapist Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Therapist" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}