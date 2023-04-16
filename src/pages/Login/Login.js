import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { appLogo, loginImg } from '../../assets';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [id, setID] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/tavern', { state: { name, id } });
  };

  return (
    <div className="login-page">
      <div className="login-section">
        <header className="login-header">
          <img src={appLogo} alt="Hunters Association" draggable="false" />
        </header>
        <div className="login-hero">
          <img src={loginImg} alt="Hunters bar" draggable="false" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            required
            pattern="[a-zA-Z]{3, }"
            title="Must have at least 3 letters."
            placeholder="Enter your Name ..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
//Agina is the best
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{12}"
            maxLength="12"
            title="Valid hunter's ID must have 12 digits."
            placeholder="Enter your Card No. ..."
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
