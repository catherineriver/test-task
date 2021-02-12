import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Auth from './components/Auth/Auth';
import Forgot from './components/Forgot/Forgot';

function App () {
  return (
    <div className="App">
      <Switch>
        <Route path="/forgot" component={Forgot} />
        <Route path="/login" component={Auth} />
        <Route path="/register" component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
