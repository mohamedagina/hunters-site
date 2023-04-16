import { useState, useEffect } from 'react';
import { leftDoor, rightDoor } from '../../assets';
import './DoorAnimation.css';

const DoorAnimation = ({ duration, fadeDuration }) => {
  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (leftLoaded && rightLoaded) {
      const totalDurationInMS = (duration + fadeDuration) * 1000;
      const timeout = setTimeout(() => {
        setFinished(true);
      }, totalDurationInMS);
      return () => clearTimeout(timeout);
    }
  }, [leftLoaded, rightLoaded, duration, fadeDuration]);

  if (finished) return;

  return (
    <div
      className={`door-animation ${leftLoaded && rightLoaded ? 'loaded' : ''}`}
      style={{
        '--duration': `${duration}s`,
        '--fade-duration': `${fadeDuration}s`
      }}
    >
      <div className="door left">
        <img
          src={leftDoor}
          alt="left door"
          onLoad={() => setLeftLoaded(true)}
        />
      </div>
      <div className="door right">
        <img
          src={rightDoor}
          alt="right door"
          onLoad={() => setRightLoaded(true)}
        />
      </div>
    </div>
  );
};

export default DoorAnimation;
