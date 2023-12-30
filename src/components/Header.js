import React from 'react';
import headerStyles from '../styles/components/Header.module.css';

function Header({ title, imageUrl }) {
  const headerBg = {
    backgroundImage: `url('${imageUrl}')`,
  };

  return (
    <div style={headerBg} className={headerStyles.fullscreenHeader}>
      <h1>{title}</h1>
    </div>
  );
}

export default Header;