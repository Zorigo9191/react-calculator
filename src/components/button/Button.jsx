import "./Button.scss";

function Button({ onClick, value, type }) {
  return (
    <button onClick={onClick} className={`Button ${type || ""}`}>
      {value}
    </button>
  );
}

export default Button;
