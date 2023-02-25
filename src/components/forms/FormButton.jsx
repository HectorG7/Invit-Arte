import React from "react";

export const FormButton = ({ text, icon }) => {
  return (
    <button type="submit" className="form__button form__button-primary">
      <span className="form__button-text">{text}</span>
      <span className="form__button-icon">
        <i className={icon}></i>
      </span>
    </button>
  );
};
