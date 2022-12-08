import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import SessionsList from "./components/sessions-list.component";
import EditSession from "./components/edit-session.component";
import CreateSession from "./components/create-session.component";
import CreateTherapist from "./components/create-therapist.component";
import CreateClient from "./components/create-client-component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={SessionsList} />
      <Route path="/edit/:id" component={EditSession} />
      <Route path="/create" component={CreateSession} />
      <Route path="/therapist" component={CreateTherapist} />
      <Route path="/client" component={CreateClient} />
      </div>
    </Router>
  );
}

export default App;


