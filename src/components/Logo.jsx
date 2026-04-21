import React from "react";

const Logo = ({ className = "" }) => {
  return (
    <div className={`logo ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
      >
        {/* Theater Curtain */}
        <path
          d="M5 8C5 6.89543 5.89543 6 7 6H33C34.1046 6 35 6.89543 35 8V32C35 33.1046 34.1046 34 33 34H7C5.89543 34 5 33.1046 5 32V8Z"
          fill="#ffd166"
          stroke="#040814"
          strokeWidth="2"
        />
        {/* Curtain Folds */}
        <path
          d="M10 6V34M15 6V34M20 6V34M25 6V34M30 6V34"
          stroke="#040814"
          strokeWidth="1"
        />
        {/* Stage Light */}
        <circle cx="20" cy="20" r="8" fill="#040814" />
        <circle cx="20" cy="20" r="4" fill="#ffd166" />
        {/* Spotlight Rays */}
        <path
          d="M20 12L22 10M20 28L22 30M28 20L30 22M12 20L10 22"
          stroke="#ffd166"
          strokeWidth="2"
        />
      </svg>
      <span className="logo-text">Online-Rangmanch</span>
    </div>
  );
};

export default Logo;
