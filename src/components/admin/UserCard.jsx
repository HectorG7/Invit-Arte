import { useState } from "react";

import Swal from "sweetalert2";
import validator from "validator";
import Modal from "react-modal";

import { useForm } from "../../hooks/useForm";

import { deleteUserById } from "../../helpers/admin/deleteUserById";
import { updateUser } from "../../helpers/admin/udpateUser";

import { FormInput } from "../forms/FormInput";
import { FormButton } from "../forms/FormButton";

const validFields = {
  email: false,
  name: false,
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

  return errors;
};

export const UserCard = ({
  id,
  email,
  user_metadata,
  created_at,
  last_sign_in_at,
  numUser,
}) => {
  const initialForms = {
    email: email,
    name: user_metadata.name,
  };

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

  const createdDate = created_at?.split("T")[0];
  const lastSign = last_sign_in_at?.split("T")[0] || "Nunca";

  /**
   * Si el usuario confirma la eliminación, el usuario se elimina y se muestra un mensaje de éxito,
   * luego se vuelve a cargar la página.
   */
  const deleteUser = () => {
    //Confirmar si desea eliminar el usuario
    Swal.fire({
      title: "Espera",
      icon: "warning",
      text: `Estas seguro de eliminar a ${user_metadata.name}?`,
      customClass: "fs-lg",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        //Elimina el usuario y muestra un mensaje de exito y despues se recarga la pagina
        deleteUserById(id);
        Swal.fire({
          title: "Usuario eliminado",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          customClass: "fs-lg",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      return;
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validFields.email || !validFields.name) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Los datos no son correctos o no fueron modificados",
        customClass: "fs-lg",
      });
      return;
    }

    Swal.fire({
      title: "Espera",
      icon: "warning",
      text: `Estas seguro de actualizar los datos de ${user_metadata.name}?`,
      customClass: "fs-lg",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        updateUser(id, {
          email: form.email,
          user_metadata: {
            name: form.name,
          },
        });
        Swal.fire({
          title: "Usuario actualizado",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          customClass: "fs-lg",
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      return;
    });
  };

  return (
    <div className="grid__item">
      <div className="grid__item-content">
        <div className="item__title">
          <span>#{numUser + 1}</span>
          <p>{user_metadata.name}</p>
        </div>
        <div className="item__content">
          <div>
            <span>Correo:</span>
            <p>{email}</p>
          </div>
          <div className="item__content-dates">
            <div>
              <span>Creado:</span>
              <p>{createdDate}</p>
            </div>
            <div>
              <span>Última sesión:</span>
              <p>{lastSign}</p>
            </div>
          </div>
        </div>
        <div className="item__footer">
          <button className="item__button-warning" onClick={openModal}>
            Editar<i className="fa-solid fa-pencil"></i>
          </button>
          <button className="item__button-danger" onClick={deleteUser}>
            Eliminar <i className="fa-solid fa-trash"></i>
          </button>
        </div>
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
            <h3>Editar usuario</h3>
            <form
              className="form__inputs margin__top-md"
              onSubmit={handleUpdate}
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
              <div className="margin__bottom-lgg">
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
              <div className="form__buttons">
                <FormButton text="Actualizar" icon="fa-solid fa-pen" />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};
