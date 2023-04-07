import { useState } from "react";

import Swal from "sweetalert2";
import Modal from "react-modal";
import validator from "validator";

import {
  deleteDesignById,
  updateDesignById,
} from "../../helpers/admin/designs";

import { useForm } from "../../hooks/useForm";
import { FormInput } from "../forms/FormInput";
import { FormButton } from "../forms/FormButton";

const validFields = {
  image: false,
  name: false,
};

const validationsForm = (form) => {
  const errors = {};

  if (validator.isEmpty(form.name)) {
    errors.name = "El nombre es obligatorio";
    validFields.name = false;
  } else {
    validFields.name = true;
  }

  return errors;
};

export const Design = ({ name, image, number, id }) => {
  const initialForms = {
    name,
    image,
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

  const deleteDesign = async () => {
    Swal.fire({
      title: "Espera",
      icon: "warning",
      text: `Estas seguro de eliminar el diseño?`,
      customClass: "fs-lg",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteDesignById(id);
        Swal.fire({
          title: "Diseño eliminado",
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

  const updateDesign = (e) => {
    e.preventDefault();
    if (!validFields.name) {
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
      text: `Estas seguro de actualizar el diseño?`,
      customClass: "fs-lg",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        updateDesignById(id, form.name, form.image);
        Swal.fire({
          title: "Diseño actualizado",
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
          <span>#{number}</span>
          <p>{name}</p>
        </div>
        <div className="item__content">
          <div className="item__content-image">
            <img src={image} alt={name} />
          </div>
        </div>

        <div className="item__footer">
          <button className="item__button-warning" onClick={openModal}>
            Editar<i className="fa-solid fa-pencil"></i>
          </button>
          <button className="item__button-danger" onClick={deleteDesign}>
            Eliminar
            <i className="fa-solid fa-trash"></i>
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
            <h3>Editar diseño</h3>
            <form
              className="form__inputs margin__top-md"
              onSubmit={updateDesign}
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
              <div className="margin__bottom-md">
                <textarea
                  className="form__textarea margin__bottom-lg"
                  name="image"
                  rows="7"
                  placeholder="Mensaje"
                  onChange={handleChange}
                  value={form.image}
                ></textarea>
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
