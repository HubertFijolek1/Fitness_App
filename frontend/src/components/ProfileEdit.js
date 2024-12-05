import React, { useState, useEffect } from 'react';
import api from '../api/api';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    bio: '',
    avatar: null,
  });

  useEffect(() => {
    api
      .get('/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        setProfile({ ...profile, bio: response.data.bio });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, avatar: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('bio', profile.bio);
    if (profile.avatar) {
      formData.append('avatar', profile.avatar);
    }

    api
      .put('/profile/update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        alert('Profile updated successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label>Avatar:</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
