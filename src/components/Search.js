import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.data) {
        navigate(`/user/${username}`);
      }
    } catch (error) {
      console.error('User not found');
    }
  };

  return (
    <div className='search-container'>
      <div className='logo'></div>  
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
            <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            />
        </div>
      </form>
      <h4>Welcome to Github Finder</h4>
    </div>
  );
};

export default Search;
