import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [dogImage, setDogImage] = useState('');  // State to store dog image URL

  // const handleEmailChange = (e) => setEmail(e.target.value);
  // const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password); 
  };

  // Fetch random dog image when component mounts
  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(response.data.message); 
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };
    fetchDogImage();
  }, []); 

  return (
    <div className="login-container">
      <h2>Don't waste food; <br></br>
        give it to your dog</h2>
      {/* <h2>Login</h2>
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
            required */}
          {/* /> */}
        {/* </div> */}
        {/* <button type="submit">Login</button>
      </form> */}

      {/* Display the dog image*/}
      {dogImage && (
        <div className="dog-image-container">
          <img src={dogImage} alt="Random Dog" className="dog-image" />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
