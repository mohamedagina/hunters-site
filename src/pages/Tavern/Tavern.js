import { Navigate, useLocation } from 'react-router-dom';
import DoorAnimation from '../../components/DoorAnimation/DoorAnimation';

const Tavern = () => {
  const { state: userInfo } = useLocation();

  if (!userInfo?.name || !userInfo?.id) return <Navigate to="/" />;

  return (
    <div>
      <DoorAnimation duration={2} fadeDuration={1} />
    </div>
  );
};

export default Tavern;
