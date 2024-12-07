import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import UserSearch from './components/UserSearch';
import ExercisesPage from './components/ExercisesPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar (optional) */}
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between">
            <div className="text-xl font-bold">Fitness Tracker</div>
            <div className="space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-500">Home</a>
              <a href="/register" className="text-gray-700 hover:text-blue-500">Register</a>
              <a href="/login" className="text-gray-700 hover:text-blue-500">Login</a>
              <a href="/profile" className="text-gray-700 hover:text-blue-500">Profile</a>
              <a href="/search" className="text-gray-700 hover:text-blue-500">Search Users</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/search" element={<UserSearch />} />
          <Route path="/exercises" element={<ExercisesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

