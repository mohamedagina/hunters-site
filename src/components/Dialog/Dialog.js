import './Dialog.css';

const Dialog = ({ userInfo: { name, id } }) => {
  return (
    <div className="dialog">
      <header>
        Welcome {name}#{id}, pick your license.
      </header>
      <ul className="dialog-menu">
        <li>
          <button>Two stars hunter</button>
        </li>
        <li>
          <button>three stars hunter</button>
        </li>
      </ul>
    </div>
  );
};

export default Dialog;
