import React from 'react';
import '../FloatingInput.css';

const FloatingInput = ({ label, ...props }) => (
  <div className="floating-input">
    <input className='form-control' type="text" required placeholder=" " {...props} />
    <label>{label}</label>
  </div>
);

export default FloatingInput;
