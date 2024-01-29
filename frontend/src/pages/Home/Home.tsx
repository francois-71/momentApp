import React, { useState, useEffect } from 'react';
import './home.css';

interface User {
  name: string;
  email: string;
  age: number;
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((error) => {
          setErrorMessage("You are not allowed to view this page. Please log in.");
        });
    }
  }, []);

  return (
    <div className="home-container">
      {user ? (
        <div className="welcome-message">
          <p>Hello, <span className="user-name">{user.name}</span>!</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <p className="error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default Home;
