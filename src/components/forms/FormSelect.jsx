import React from "react";

export const FormSelect = ({
  onChange,
  eventValidation,
  options,
  error = "",
}) => {
  return (
    <div className="form__input-container">
      <div className={`form__input ${error !== "" && "form__input-error"}`}>
        <span>
          <i className="fa-solid fa-shirt"></i>
        </span>
        <select
          name="dressCode"
          onChange={onChange}
          onBlur={eventValidation}
          required
          defaultValue=""
        >
          <option value="" disabled>
            Codigo de vestimenta
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <span className="form__input-message">{error}</span>
    </div>
  );
};
