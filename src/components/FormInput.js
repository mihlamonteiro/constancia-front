import React from 'react';

export default function FormInput({ id, label, type = "text", value, onChange, required, errorMessage }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
      />
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
}