import validator from "validator";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";

import { FormInput } from "./FormInput";
import { FormButton } from "./FormButton";
import { registerNewUser } from "../../helpers/auth/registerNewUser";

const initialForms = {
  name: "",
  email: "",
  password: "",
};

const validFields = {
  name: false,
  email: false,
  password: false,
};

const validationsForm = (form) => {
  const errors = {};

  if (validator.isEmpty(form.name)) {
    errors.name = "El nombre es obligatorio";
    validFields.name = false;
  } else if (!validator.isAlpha(form.name, "es-ES", { ignore: "-'s" })) {
    errors.name = "Eso no parece un nombre";
    validFields.name = false;
  } else {
    validFields.name = true;
  }

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

export const FormRegister = () => {
  const { form, errors, handleChange, handleEventValidation } = useForm(
    initialForms,
    validationsForm
  );

  const handleRegisterUser = (e) => {
    e.preventDefault();
    if (!validFields.name || !validFields.email || !validFields.password) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Revisa tus datos",
        customClass: "fs-lg",
      });
      return;
    }

    registerNewUser(form.email, form.password, form.name).then((res) => {
      if (res.error) {
        Swal.fire({
          title: "Hubo un error",
          icon: "error",
          text: `${
            res.error.message === "User already registered" &&
            "Usuario ya registrado"
          }`,
          customClass: "fs-lg",
        });
        return;
      }
      Swal.fire({
        title: "Listo",
        icon: "success",
        text: "Te has registrado correctamente",
        customClass: "fs-lg",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/login/";
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
          ¿Ya tienes cuenta? <a href="/login/">Accede</a>
        </span>
      </div>
      <h1>Registrarse</h1>
      <p>Crea invitaciones a tu estilo.</p>
      <form
        className="form__inputs margin__top-md"
        onSubmit={handleRegisterUser}
      >
        <div className="margin__bottom-lg">
          <FormInput
            type="text"
            name="name"
            placeholder="Nombre"
            icon="fa-solid fa-user"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.name}
            error={errors.name}
          />
        </div>
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
          <FormButton text="Registrarse" icon="fa-solid fa-arrow-right" />
        </div>
      </form>
    </div>
  );
};
