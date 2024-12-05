import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation can be added here */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {/* Additional routes */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
