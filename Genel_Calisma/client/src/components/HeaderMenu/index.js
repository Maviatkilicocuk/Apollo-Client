import React from "react";
import { Menu } from "antd";
import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";

function HeaderMenu() {
  const location = useLocation();

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "/",
      className: styles.menuItem,
    },
    {
      label: <Link to="/new">New Event</Link>,
      key: "/new",
      className: styles.menuItem,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      className={styles.headerMenu}
      items={items}
    />
  );
}

export default HeaderMenu;
