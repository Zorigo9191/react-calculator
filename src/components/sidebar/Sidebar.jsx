import "./Sidebar.scss";

function Sidebar({ history }) {
  return (
    <div className="sidebar">
      <h3 className="sidebar__title">Verlauf</h3>
      <div className="sidebar__list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <p key={index} className="sidebar__item">
              {item}
            </p>
          ))
        ) : (
          <p> noch kein Verlauf vorhanden</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
