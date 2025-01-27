import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './TogglePanel.css';

import arrowIcon from '@/assets/icons/profile/arrow.svg';

interface Props {
  id: number;
  toggle: [number | null, React.Dispatch<React.SetStateAction<number | null>>];
  svg?: string;
  text: string;
  first?: boolean;
  links?: { href: string; icon?: string; text?: string }[];
  click?: (id: number) => void;
  radius?: string[];
}

const TogglePanel = ({ id, toggle, svg, text, first, links = [], click, radius = ["0", "0"] }: Props) => {
  const [state, setState] = toggle; 
  const isOpen = state === id; 

  function togglePanel() {
    if (isOpen) setState(null); 
    else setState(id); 
  }

  return (
    <div>
      <div
        className={`profile-settings-button ${first ? 'first' : 'last'}`}
        id="service"
        onClick={togglePanel}
        style={{ borderRadius: radius[0] }}
      >
        {svg ? <img src={svg} alt="icon" />: <div/>}
        <p>{text}</p>
        <img
          src={arrowIcon}
          style={{ rotate: isOpen ? '180deg' : '0deg' }}
          alt="arrow"
        />
      </div>
      <div
        className={`ah-panel ${isOpen ? 'active-panel' : 'hidden-panel'}`}
        style={{ borderRadius: isOpen ? radius[1] : '0' }}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            onClick={() => click?.(id)}
            className="link-conmp"
            to={link.href}
          >
            {link.icon && <img className="link-img" src={link.icon} alt="icon" />}
            {link.text && <span>{link.text}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TogglePanel;
