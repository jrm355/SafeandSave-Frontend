import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogImage, setDogImage] = useState('');  // State to store dog image URL

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password); // Placeholder for backend integration
  };

  // Fetch random dog image when component mounts
  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(response.data.message); // Store the URL of the dog image
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };
    fetchDogImage();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Display the dog image inside a framed container */}
      {dogImage && (
        <div className="dog-image-container">
          <img src={dogImage} alt="Random Dog" className="dog-image" />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
