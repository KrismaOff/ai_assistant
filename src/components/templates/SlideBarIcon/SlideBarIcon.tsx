import React from 'react';
import './SlideBarIcon.css';

import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

interface Props {
    path?: string,
    icon?: string,
    text?: string,
}

const SlideBarIcon = ({ path, icon, text }: Props) => {

    const location = useLocation()
    const currentPath = location.pathname.split("/").at(-1)
    const active = currentPath === path.replace("/", "")

    return (
        <Link to={path} className={`sidebar-icon ${active && "active-path"}`} id="home">
            <img src={icon} alt={text + " Icon"} />
            {text && <span>{text}</span>}
        </Link>
    );
};

export default SlideBarIcon;