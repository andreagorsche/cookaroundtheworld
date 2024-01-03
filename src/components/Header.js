import React from 'react';
import headerStyles from '../styles/components/Header.module.css';

function Header({ title, imageUrl, imageAlt }) {

  return (
    <div className={headerStyles.fullscreenheader}>
    <img src={imageUrl} alt={imageAlt}className={headerStyles.fullWidthImage}/>
    <h1 className={headerStyles.h1}>{title}</h1>
    </div>
  );
}

export default Header;
