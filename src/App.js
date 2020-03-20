import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MessageIcon from '@material-ui/icons/Message';
import Footer from './components/Footer.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Navigation />
          <Switch>
            <Route path="/" component={Home} exact/>
          </Switch>
        </div>
        <Footer />
        <Fab color="primary" aria-label="message" className={classes.fab}>
          <MessageIcon/>
        </Fab>
    </Router>
  );
}

export default App;
