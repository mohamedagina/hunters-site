import { useState } from 'react';

import { appLogo, loginImg } from '../../assets';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [id, setID] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Welcome back, ${name}#${id}`);
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <header className="login-header">
          <img src={appLogo} alt="Hunters Association" />
        </header>
        <div className="login-hero">
          <img src={loginImg} alt="Hunters bar" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            required
            placeholder="Enter your name..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{12}"
            title="Valid hunter's ID must have 12 numbers"
            placeholder="Enter your ID..."
            value={id}
            onChange={e => setID(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
