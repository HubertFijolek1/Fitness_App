import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    bio: '',
    avatar: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/profile/')
      .then((response) => {
        setProfile({ ...profile, bio: response.data.bio });
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch profile. Please login.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    api.put('/profile/update/', formData)
      .then((response) => {
        alert('Profile updated successfully');
        navigate('/profile');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update profile.');
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-gray-700">Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Avatar:</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
