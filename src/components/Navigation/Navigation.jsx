import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { IoHomeSharp } from "react-icons/io5";
import { TbMovie } from "react-icons/tb";

const getLinkClass = ({ isActive }) => {
  return isActive ? `${css.link} ${css.active}` : css.link;
};

const Navigation = () => {
  return (
    <nav className={css.navigator}>
      <ul className={css.container}>
        <li>
          <NavLink to="/" className={getLinkClass}>
            <IoHomeSharp />&nbsp;Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getLinkClass}>
            <TbMovie /> &nbsp;Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
