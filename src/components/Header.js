import React from 'react';
import headerStyles from '../styles/components/Header.module.css';

function Header({ title, imageUrl, imageAlt }) {
  

  return (
    <div className={headerStyles}>
    <img src={imageUrl} alt={imageAlt} />
    <h1>{title}</h1>
    </div>
  );
}

export default Header;
