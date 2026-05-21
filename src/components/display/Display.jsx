import "./Display.scss";

function Display({ value }) {
  return <div className="display">{value === "" ? "0" : value}</div>;
}

export default Display;
