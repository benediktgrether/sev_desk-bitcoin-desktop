import React from "react";
import { Link, withRouter } from "react-router-dom";

const items = [
  {
    path: "/",
    text: "Dashboard"
  },
  {
    path: "/bitcoin-details",
    text: "Bitcoin Details"
  }
];

function Menu(props) {
  function handleClick(path) {
    props.history.push(path);
  }
  return (
    <ul className='menu'>
      {items.map(item => (
        <li
          key={item.path}
          onClick={handleClick.bind(null, item.path)}
          className={
            props.location.pathname === item.path
              ? "menu-item menu-item-active"
              : "menu-item"
          }>
          <Link className='menu-link' to={item.path}>
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default withRouter(Menu);
