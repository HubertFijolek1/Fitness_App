import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';

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
          <Route path="/profile/edit" component={ProfileEdit} />

          {/* Additional routes */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
