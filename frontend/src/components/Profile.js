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
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
              {profile.avatar && (
                  <div className="md:flex-shrink-0">
                      <img
                          className="h-48 w-full object-cover md:w-48"
                          src={profile.avatar}
                          alt="User avatar"
                      />
                  </div>
              )}
              <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {profile.user}
                  </div>
                  <p className="mt-2 text-gray-500">{profile.bio}</p>
              </div>
          </div>
      </div>
  );
}

export default Profile;
