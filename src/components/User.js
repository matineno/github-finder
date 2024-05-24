import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
          throw new Error("GitHub token is missing");
        }

        const options = { headers: { Authorization: `Bearer ${token}` } };
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);

        setUser(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        setError('User not found or API rate limit exceeded');
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  const getTimeAgo = (date) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffTime = Math.abs(now - updatedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      const diffWeeks = Math.ceil(diffDays / 7);
      return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {user ? (
        <div className='container'>
          <div className='header flex space-between'>
            <div className='flex'>
              <div className='header-logo' href={user.html_url}></div>
              <h4>{user.login}</h4>
            </div>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img className='header-avatar' src={user.avatar_url} alt={user.name} />
            </a>
          </div>
          <div className='flex gap-50'>
            <div className='profile-container'>
              <div className='profile-avatar-container'>
                <img className='profile-avatar' src={user.avatar_url} alt={user.name} width="225" />
              </div>
              <h2>{user.name}</h2>
              <p>{user.bio}</p>
              <div className='flex gap-15'>
                <p>{user.followers} Followers</p>
                <p>{user.following} Following</p>
              </div>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
               <div className='profile-button'> View GitHub Profile </div>
              </a>
            </div>
            <div className='repo-container'>
              <h2>Repositories {user.public_repos}</h2>
              <ul className='repo-list'>
                {repos.map(repo => (
                  <li key={repo.id}>
                    <h3 className='repo-name'>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h3>
                    <div className='flex space-between'>
                      <p>{repo.description || 'No description available'}</p>
                      <p>Updated {getTimeAgo(repo.updated_at)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default User;
