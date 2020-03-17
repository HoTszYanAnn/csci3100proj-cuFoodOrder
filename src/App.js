import React from 'react';
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained" color="primary">
          你好，世界
        </Button>
      </header>
    </div>
  );
}

export default App;
