import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/Bloglogo.png';

function Logo({ width = '100px', height = 'auto' }) {
  return (
    <div className="flex items-center justify-center">
      <img 
        src={logo}
        alt="App Logo" 
        width={width} 
        height={height} 
        className="object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Logo;
