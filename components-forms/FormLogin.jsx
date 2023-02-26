import validator from "validator";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";

import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { loginWithEmail } from "../../helpers/auth/loginWithEmail";

const initialForms = {
  email: "",
  password: "",
};

const validFields = {
  email: false,
  password: false,
};

const validationsForm = (form, e) => {
  const errors = {};

  if (validator.isEmpty(form.email)) {
    errors.email = "El correo es obligatorio";
    validFields.email = false;
  } else if (!validator.isEmail(form.email)) {
    errors.email = "Eso no parece un correo electrónico 🥸";
    validFields.email = false;
  } else {
    validFields.email = true;
  }

  if (validator.isEmpty(form.password)) {
    errors.password = "La contraseña es obligatoria";
    validFields.password = false;
  } else if (!validator.isStrongPassword(form.password, { minSymbols: 0 })) {
    errors.password = "Al menos 8 caracteres, una minúscula y un número";
    validFields.password = false;
  } else {
    validFields.password = true;
  }

  return errors;
};

export const FormLogin = () => {
  const { form, errors, handleChange, handleEventValidation } = useForm(
    initialForms,
    validationsForm
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validFields.email || !validFields.password) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Revisa tus datos",
        customClass: "fs-lg",
      });
      return;
    }

    loginWithEmail(form.email, form.password).then((res) => {
      if (res.error) {
        Swal.fire({
          title: "Hubo un error",
          icon: "error",
          text: `${
            res.error.message === "Invalid login credentials" &&
            "Credenciales de acceso inválidas o no estas registrado 💔"
          }`,
          customClass: "fs-lg",
        });
        return;
      }

      Swal.fire({
        title: "Bienvenid@ de nuevo",
        icon: "success",
        customClass: "fs-lg",
      }).then((res) => {
        if (res.isConfirmed) {
          if (form.email === "admin@gmail.com") {
            setTimeout(() => {
              window.location.href = "/admin";
            }, 500);
            return;
          }
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
      });
    });
  };

  return (
    <div className="form">
      <div className="form__header">
        <a href="/">
          <img src="/images/logo.svg" alt="Logo Invit-Arte" />
        </a>
        <span>
          ¿No tienes cuenta? <a href="/register/">Registrate</a>
        </span>
      </div>
      <h1>Iniciar Sesión</h1>
      <p>Crea invitaciones a tu estilo.</p>
      <form className="form__inputs margin__top-md" onSubmit={handleSubmit}>
        <div className="margin__bottom-lg">
          <FormInput
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            icon="fa-solid fa-envelope"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.email}
            error={errors.email}
          />
        </div>
        <div className="margin__bottom-lgg">
          <FormInput
            name="password"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.password}
            error={errors.password}
          />
        </div>
        <div className="form__buttons">
          <FormButton text="Iniciar Sesión" icon="fa-solid fa-arrow-right" />
        </div>
      </form>
    </div>
  );
};
