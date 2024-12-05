import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/profile/')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch profile. Please login.');
      });
  }, []);

  if (!profile) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold">{profile.user}'s Profile</h1>
      <div className="mt-4">
        {profile.avatar && (
          <img src={profile.avatar} alt="Avatar" className="w-32 h-32 rounded-full" />
        )}
        <p className="mt-2">{profile.bio}</p>
      </div>
      <Link to="/profile/edit" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Edit Profile
      </Link>
    </div>
  );
}

export default Profile;
