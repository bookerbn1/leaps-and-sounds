import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Session = props => (
  <tr>
    <td>{props.session.name}</td>
    <td>{props.session.client}</td>
    <td>{props.session.description}</td>
    <td>{props.session.cost}</td>
    <td>{props.session.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.session._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteSession(props.session._id) }}>delete</a>
    </td>
  </tr>
)

export default class SessionsList extends Component {
  constructor(props) {
    super(props);

    this.deleteSession = this.deleteSession.bind(this)

    this.state = {sessions: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/sessions/')
      .then(response => {
        this.setState({ sessions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSession(id) {
    axios.delete('http://localhost:5000/sessions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      sessions: this.state.sessions.filter(el => el._id !== id)
    })
  }

  sessionList() {
    return this.state.sessions.map(currentsessions => {
      return <Session session={currentsessions} deleteSession={this.deleteSession} key={currentsessions._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Sessions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Therapist Name</th>
              <th>Client</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.sessionList() }
          </tbody>
        </table>
      </div>
    )
  }
}