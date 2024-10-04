import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Switch, Route, useLocation } from 'react-router-dom';
import Success from './components/Success';

function App() {

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
      <Route exact path="/Success">
        <Success />
      </Route>
    </>
  )
}

export default App
