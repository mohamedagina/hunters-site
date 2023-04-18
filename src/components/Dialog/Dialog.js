import './Dialog.css';

const Dialog = ({ userInfo: { name, id } }) => {
  return (
    <div className="dialog">
      <header>
        Welcome {name}#{id}, pick your license.
      </header>
      <ul className="dialog-menu">
        <li>
          <button>Basic Hunter License</button>
        </li>
        <li>
          <button>Two stars Hunter License</button>
        </li>
        <li>
          <button disabled>Three stars Hunter License</button>
        </li>
      </ul>
    </div>
  );
};

export default Dialog;
