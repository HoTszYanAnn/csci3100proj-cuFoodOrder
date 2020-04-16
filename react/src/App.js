import React, { Fragment } from 'react';
import Router from "./Router";
import './App.css';


function App() {
  console.log(process.env.API_URL);
  
  return (
    <Fragment>
        <Router />
    </Fragment>
  );
}

export default App;
