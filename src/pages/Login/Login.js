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
    navigate('/tavern', { state: { name: name.trim(), id } });
  };

  const handleNameChange = e => {
    const newName = e.target.value.replace(
      /[^a-zA-Zء-ي]*([a-zA-Zء-ي]*\s?)[^a-zA-Zء-ي]*/g,
      '$1'
    );
    setName(newName);
  };

  const handleIDChange = e => {
    const newID = e.target.value.replace(/^0/, '').replace(/[^0-9]*/g, '');
    setID(newID);
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
            pattern="([a-zA-Zء-ي]{3,}\s?)+"
            title="Each name must have at least 3 letters."
            placeholder="Enter your name ..."
            value={name}
            onChange={handleNameChange}
          />
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{14}"
            maxLength="14"
            title="Valid hunter's ID must have 14 digits."
            placeholder="Enter your card no. ..."
            value={id}
            onChange={handleIDChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
