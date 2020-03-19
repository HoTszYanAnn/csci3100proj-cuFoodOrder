import React from 'react';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
          <Switch>
            <Route path="/" component={Home} exact/>
          </Switch>
        </div> 
    </Router>
  );
}

export default App;
