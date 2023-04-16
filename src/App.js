import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Tavern from './pages/Tavern/Tavern';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tavern" element={<Tavern />} />
      </Routes>
    </div>
  );
}

export default App;
