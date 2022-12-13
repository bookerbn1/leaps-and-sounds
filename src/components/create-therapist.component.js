import React, { Component } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    axios.post("https://https-csds132-leaps-and-sounds-backend.onrender.com/therapists/add", therapist)  
    .then(res => console.log(res.data));

    this.setState({
      name: ''
    })
    toast.success('Therapist Successfully Created!');
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
        <ToastContainer
                  closeButton={false}
                  theme="dark"
                  position="bottom-right"
                />
      </div>
    )
  }
}