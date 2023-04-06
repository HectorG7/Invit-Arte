import { useState } from "react";

import Modal from "react-modal";
import Swal from "sweetalert2";
import validator from "validator";

import { useForm } from "../../hooks/useForm";

import { createUser } from "../../helpers/admin/createUser";

import { FormButton } from "../forms/FormButton";
import { FormInput } from "../forms/FormInput";

const initialForms = {
  email: "",
  name: "",
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
    errors.email = "Formato de correo electrónico no valido";
    validFields.email = false;
  } else {
    validFields.email = true;
  }

  if (validator.isEmpty(form.password)) {
    errors.password = "La contraseña es obligatoria";
    validFields.password = false;
  } else if (!validator.isStrongPassword(form.password, { minSymbols: 0 })) {
    errors.password = "Al menos 8 caracteres, una mayúscula y un número";
    validFields.password = false;
  } else {
    validFields.password = true;
  }

  return errors;
};

export const ButtonCreateUser = () => {
  const { form, errors, handleChange, handleEventValidation } = useForm(
    initialForms,
    validationsForm
  );

  //Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("body");
  //Modal

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!validFields.name || !validFields.email || !validFields.password) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Revisa los datos",
        customClass: "fs-lg",
      });
      return;
    }

    createUser(form.email, form.password, form.name).then((res) => {
      if (res.error) {
        Swal.fire({
          title: "Hubo un error",
          icon: "error",
          text: `${
            res.error.message ===
              "Email address already registered by another user" &&
            "Correo electrónico ya registrado por otro usuario"
          }`,
          customClass: "fs-lg",
        });
        return;
      }
      Swal.fire({
        title: "Listo",
        icon: "success",
        text: "Usuario creado correctamente",
        customClass: "fs-lg",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    });
  };

  return (
    <>
      <button className="primary" onClick={openModal}>
        Crear Usuario
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="close__content">
          <button onClick={closeModal}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <div className="form__modal">
          <h3>Crear usuario</h3>
          <form
            className="form__inputs margin__top-md"
            onSubmit={handleCreateUser}
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
              <FormButton text="Crear usuario" icon="fa-solid fa-arrow-right" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
