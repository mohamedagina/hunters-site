import { useState, useRef, useEffect, Fragment } from 'react';
import { toPng } from 'html-to-image';
import './Dialog.css';

import { basicLicense, twoStarLicense } from '../../assets';
import { ReactComponent as LoadingIcon } from '../../assets/loading.svg';

const licenseTypes = {
  BASIC: 'BASIC',
  TWO_STAR: 'TWO_STAR'
};

const Dialog = ({ userInfo: { name, id } }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [licenseBeingDownloaded, setLicenseBeingDownloaded] = useState(null);

  const basicLicenseEl = useRef(null);
  const twoStarLicenseEl = useRef(null);

  const handleDownloadLicense = type => {
    const ref = type === licenseTypes.BASIC ? basicLicenseEl : twoStarLicenseEl;

    if (ref.current === null || licenseBeingDownloaded) {
      return;
    }

    setLicenseBeingDownloaded(type);

    toPng(ref.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = `${name}-License.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLicenseBeingDownloaded(null);
      });
  };

  useEffect(() => {
    // change hunter-name font-size based on the length of the name
    const nameEl = basicLicenseEl.current.querySelectorAll('.hunter-name');
    if (nameEl.length === 0) {
      return;
    }

    nameEl.forEach(el => {
      const nameLength = name.length;
      if (nameLength <= 20) {
        el.style.fontSize = '2rem';
      } else if (nameLength < 24) {
        el.style.fontSize = '1.75rem';
      } else if (nameLength < 27) {
        el.style.fontSize = '1.5rem';
      } else {
        el.style.fontSize = '1rem';
      }
    });
  }, [name.length]);

  return (
    <>
      <div className="dialog">
        <header>
          Welcome back {name}#{id}.
        </header>
        <button onClick={() => setShowMenu(!showMenu)}>
          <div>
            {' '}
            {showMenu ? 'Back To The Previous Menu' : 'Get Your License'}
          </div>
        </button>

        <ul className={`dialog-menu ${showMenu ? 'show' : ''}`}>
          <li>
            <LicenseGenerator
              isLoading={licenseBeingDownloaded === licenseTypes.BASIC}
              onClick={() => handleDownloadLicense(licenseTypes.BASIC)}
            >
              Basic Hunter License
            </LicenseGenerator>
          </li>
          <li>
            <LicenseGenerator
              isLoading={licenseBeingDownloaded === licenseTypes.TWO_STAR}
              onClick={() => handleDownloadLicense(licenseTypes.TWO_STAR)}
            >
              Two stars Hunter License
            </LicenseGenerator>
          </li>
          <li>
            <LicenseGenerator disabled>
              Three stars Hunter License
            </LicenseGenerator>
          </li>
        </ul>
      </div>
      <div className="license-to-download">
        <div className="license" ref={basicLicenseEl}>
          <div className="hunter-name">{name}</div>
          <div className="hunter-id">
            {
              // insert space between every 7, 3, 4 characters
              `${id}`
                .replace(/(\d{7})(\d{3})(\d{4})/, '$1 $2 $3')
                .split(' ')
                .map((part, i, arr) => (
                  <Fragment key={i}>
                    {part} {i !== arr.length - 1 && <> &nbsp; &nbsp;</>}
                  </Fragment>
                ))
            }
          </div>
          <img src={basicLicense} alt={`${name} hunter license`} />
        </div>

        <div className="license" ref={twoStarLicenseEl}>
          <div className="hunter-id">
            {
              // insert space between every 7, 3, 4 characters
              `${id}`
                .replace(/(\d{7})(\d{3})(\d{4})/, '$1 $2 $3')
                .split(' ')
                .map((part, i, arr) => (
                  <Fragment key={i}>
                    {part} {i !== arr.length - 1 && <> &nbsp; &nbsp;</>}
                  </Fragment>
                ))
            }
          </div>
          <img src={twoStarLicense} alt={`${name} hunter license`} />
        </div>
      </div>
    </>
  );
};

const LicenseGenerator = ({
  className,
  children,
  onClick,
  isLoading,
  ...restProps
}) => {
  return (
    <button
      onClick={onClick}
      className={`license-generator ${className ?? ''}`}
      {...restProps}
    >
      {isLoading && <LoadingIcon />}
      <div>{children}</div>
    </button>
  );
};

export default Dialog;
