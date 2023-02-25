import { useState } from "react";

import { getDate } from "../../helpers/getDate";

export const FormInput = ({
  type,
  name,
  placeholder,
  icon,
  onChange,
  eventValidation,
  value,
  error = "",
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  //La usamos para validar evitar que se puede selecciona fechas que ya pasaron
  const date = getDate();

  if (name === "password") {
    const showPassword = () => {
      setIsShowPassword(!isShowPassword);
    };

    return (
      <div className="form__input-container">
        <div className={`form__input ${error !== "" && "form__input-error"}`}>
          <span>
            <i className="fa-solid fa-lock"></i>
          </span>
          <input
            type={isShowPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            onChange={onChange}
            onBlur={eventValidation}
            onKeyUp={eventValidation}
            required
            value={value}
          />
          <button className="show__pass" type="button" onClick={showPassword}>
            <i className="fa-regular fa-eye"></i>
          </button>
        </div>
        <span className="form__input-message">{error}</span>
      </div>
    );
  }

  return (
    <div className="form__input-container">
      <div className={`form__input ${error !== "" && "form__input-error"}`}>
        <span>
          <i className={icon}></i>
        </span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={eventValidation}
          onKeyUp={eventValidation}
          required
          value={value}
          min={type === "date" ? date : undefined}
        />
        <span className="form__input-status">
          {error !== "" && <i className="fa-regular fa-circle-xmark"></i>}
        </span>
      </div>
      <span className="form__input-message">{error}</span>
    </div>
  );
};
