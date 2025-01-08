import React, { useState } from "react";
import "./ButtonWithIcon.css";

interface Props {
  text: string;
  type?: string;
  icon?: string;
  style?: {
    background: string;
    color: string;
  };
  hover?: {
    background: string;
  };
  click?: () => void;
}

const ButtonWithIcon = ({ text, type, icon, style, hover, click }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const currentStyle = {
    ...style,
    background: isHovered && hover ? hover.background : style?.background,
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  return (
    <button
      type={type}
      className="btn"
      style={currentStyle}
      onClick={click}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{icon && <img src={icon} alt={text} />}</span>
      {text}
      <span></span>
    </button>
  );
};

export default ButtonWithIcon;
