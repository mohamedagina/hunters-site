import { useRef, useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import DoorAnimation from '../../components/DoorAnimation/DoorAnimation';
import { appMain } from '../../assets';

import './Tavern.css';
import Dialog from '../../components/Dialog/Dialog';

const Tavern = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { state: userInfo } = useLocation();
  const tavernImg = useRef();
  const colliderEl = useRef();

  useEffect(() => {
    if (tavernImg.current && colliderEl.current) {
      const img = tavernImg.current;
      const collider = colliderEl.current;
      const adjustCollider = () => {
        const naturalRatio = img.naturalWidth / img.naturalHeight;
        const ratio = img.width / img.height;
        let width = img.width;
        let height = img.height;
        if (naturalRatio > ratio) width = parseInt(height * naturalRatio);
        else height = parseInt(width / naturalRatio);

        const colliderRight = parseInt(0.39 * width - (width - img.width) / 2);
        const colliderTop = parseInt(0.23 * height - (height - img.height) / 2);
        const colliderWidth = parseInt(0.06 * width);
        const colliderHeight = parseInt(0.15 * height);

        collider.setAttribute(
          'style',
          `top: ${colliderTop}px; right: ${colliderRight}px; width: ${colliderWidth}px; height: ${colliderHeight}px`
        );
      };

      const closeDialog = e => {
        if (!collider.contains(e.target)) setIsDialogOpen(false);
      };

      img.addEventListener('load', adjustCollider);
      window.addEventListener('resize', adjustCollider);

      document.addEventListener('click', closeDialog, true);
      return () => {
        window.removeEventListener('resize', adjustCollider);
        img.removeEventListener('load', adjustCollider);

        document.removeEventListener('click', closeDialog);
      };
    }
  }, []);

  if (!userInfo?.name || !userInfo?.id) return <Navigate to="/" />;

  return (
    <>
      <DoorAnimation duration={2} fadeDuration={1} />
      <div className="tavern">
        <img
          ref={tavernImg}
          className="tavern-img"
          src={appMain}
          alt="hunter's tavern"
          draggable="false"
        />

        <div
          ref={colliderEl}
          className="collider"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="tool-tip">
            Barista
            <ul>
              <li>Obtain your license</li>
            </ul>
          </div>
          {isDialogOpen && <Dialog userInfo={userInfo} />}
        </div>
      </div>
    </>
  );
};

export default Tavern;
