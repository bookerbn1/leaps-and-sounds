import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
        return (
      <nav className="navbar navbar-primary navbar-expand-lg">
        <a class="navbar-brand" href="/#">
        <img src="favicon.ico" alt=""logo class="logo"></img>
          </a> 
        <Link to="/" className="navbar-brand">Speech Therapy Session Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav nav-pills nav-fill">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Sessions</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Session Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/therapist" className="nav-link">Create Therapist</Link>
          </li>
          <li className="navbar-item">
          <Link to="/client" className="nav-link">Create Client</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  } 
}