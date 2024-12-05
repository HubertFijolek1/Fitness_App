import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get('/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1>{profile.user}'s Profile</h1>
      {profile.avatar && (
        <img src={profile.avatar} alt="Avatar" className="w-32 h-32 rounded-full" />
      )}
      <p>{profile.bio}</p>
    </div>
  );
}

export default Profile;
