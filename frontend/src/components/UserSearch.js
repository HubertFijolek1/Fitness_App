import React, { useState } from 'react';
import api from '../api/api';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    api.get('/users/', {
      params: { search: query },
    })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to search users.');
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold">Search Users</h1>
      <form onSubmit={handleSearch} className="mt-4 flex space-x-2">
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter username or email"
          className="flex-grow border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      <ul className="mt-4">
        {results.map((user) => (
          <li key={user.id} className="border-b py-2">
            <span className="font-semibold">{user.username}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;
