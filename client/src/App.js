import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Beers from './pages/Beers';
import Beer from './pages/Beer';
import Breweries from './pages/Breweries';
import Brewery from './pages/Brewery.jsx';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/beers" component={Beers} />
        <Route exact path="/beers/:id" component={Beer} />
        <Route exact path="/breweries" component={Breweries} />
        <Route exact path="/brewery/:id" component={Brewery} />
      </Switch>
    </div>
  );
}

export default App;
