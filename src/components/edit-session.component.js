import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditSession extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      client: '',
      description: '',
      cost: 70,
      date: new Date(),
      therapists: [],
      clients: []
    }
  }

  componentDidMount() {
    axios.get("https://https-csds132-leaps-and-sounds-backend.onrender.com/sessions/"+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          client: response.data.client,
          description: response.data.description,
          cost: response.data.cost,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get("https://https-csds132-leaps-and-sounds-backend.onrender.com/therapists/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            therapists: response.data.map(therapist => therapist.name),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeClient(e) {
    this.setState({
      clientName: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeCost(e) {
    this.setState({
      cost: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const session = {
      name: this.state.name,
      client: this.state.client,
      description: this.state.description,
      cost: this.state.cost,
      date: this.state.date
    }

    console.log(session);

    axios.post('https://https-csds132-leaps-and-sounds-backend.onrender.com/sessions/update/' + this.props.match.params.id, session)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Session Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Therapist Name: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.name}>
              {
                this.state.therapists.map(function(therapist) {
                  return <option 
                    key={therapist}
                    value={therapist}>{therapist}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Cost ($): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.cost}
              onChange={this.onChangeCost}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Session Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}