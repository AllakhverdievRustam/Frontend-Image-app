import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MianComponent/MainPage';
import './App.scss';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/Main' component={MainPage} />
        <Redirect from='/' to='/Main' />
      </Switch>
    </div>
  );
}

export default App;