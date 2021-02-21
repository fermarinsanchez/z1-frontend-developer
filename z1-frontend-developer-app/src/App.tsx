import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Scan from './pages/Scan';
import './App.css';

function App() {

  return (
    <div className='App' id='App'>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/scan' component={Scan} />
      </Switch>
    </div>
  );
}

export default App;
