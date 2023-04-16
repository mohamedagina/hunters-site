import { Navigate, useLocation } from 'react-router-dom';
import DoorAnimation from '../../components/DoorAnimation/DoorAnimation';
import { appMain } from '../../assets';

import './Tavern.css';

const Tavern = () => {
  const { state: userInfo } = useLocation();

  if (!userInfo?.name || !userInfo?.id) return <Navigate to="/" />;

  return (
    <>
      <DoorAnimation duration={2} fadeDuration={1} />
      <div className="tavern">
        <img
          className="tavern-img"
          src={appMain}
          alt="hunter's tavern"
          draggable="false"
        />
      </div>
    </>
  );
};

export default Tavern;
