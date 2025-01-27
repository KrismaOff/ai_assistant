import React from "react";
import "./Sidebar.css";

import SlideBarIcon from "@/components/templates/SlideBarIcon/SlideBarIcon";

import { ROUTES, buildPath } from "@/assets/data/paths";

// import logo from '../../../assets/icons/sidebar/person.svg'
import logo from "../../../assets/icons/sidebar/logo.png";
// import logo from '@/assets/icons/sidebar/logo.png';
import chat from "@/assets/icons/sidebar/chat.svg";
import person from "@/assets/icons/sidebar/person.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="logo">
          <img src={logo} alt="Логотип" className="logo-img" />
        </div>
        <div className="sidebar-icons">
          <SlideBarIcon
            path={buildPath(ROUTES.CHAT.root)}
            icon={chat}
            text="Chats"
          />
          <SlideBarIcon
            path={buildPath(ROUTES.PROFILE.root)}
            icon={person}
            text="Profile"
          />
        </div>
        <div className="empty-block-sidebar" />
      </div>
    </div>
  );
};

export default Sidebar;
