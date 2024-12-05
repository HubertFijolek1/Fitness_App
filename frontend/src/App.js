import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation can be added here */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
          {/* Additional routes */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
