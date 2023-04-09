import { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";
import Swal from "sweetalert2";
import validator from "validator";
import confetti from "canvas-confetti";
import { v4 as uuidv4 } from "uuid";

import { userLog } from "../../helpers/auth/getUserLogged";
import { uploadInvitationData } from "../../helpers/invitations/uploadInvitationData";

import { useForm } from "../../hooks/useForm";

import { LoadingPage } from "../LoadingPage";
import { FormButton } from "./FormButton";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

const initialForms = {
  name: "",
  date: "",
  time: "",
  direction: "",
  dressCode: "",
};

const validFields = {
  name: false,
  date: false,
  time: false,
  direction: false,
  dressCode: false,
};

const validationsForm = (form, e) => {
  const errors = {};

  if (validator.isEmpty(form.name)) {
    errors.name = "El nombre del evento es obligatorio";
    validFields.name = false;
  } else if (!validator.isAlpha(form.name, "es-ES", { ignore: "-'s" })) {
    errors.name = "El nombre del evento debe contener solo letras";
    validFields.name = false;
  } else {
    validFields.name = true;
  }

  if (validator.isEmpty(form.date)) {
    errors.date = "La fecha es obligatoria";
    validFields.date = false;
  } else if (!validator.isAfter(form.date)) {
    errors.date = "La fecha debe ser superior";
    validFields.date = false;
  } else {
    validFields.date = true;
  }

  if (validator.isEmpty(form.time)) {
    errors.time = "El horario es obligatorio";
    validFields.time = false;
  } else {
    validFields.time = true;
  }

  if (validator.isEmpty(form.direction)) {
    errors.direction = "La direccion es obligatoria";
    validFields.direction = false;
  } else {
    validFields.direction = true;
  }

  if (validator.isEmpty(form.dressCode)) {
    errors.dressCode = "El codigo de vestimenta es obligatorio";
    validFields.dressCode = false;
  } else {
    validFields.dressCode = true;
  }

  return errors;
};

//Codigos de vestimenta
const dressCodeTypes = [
  "Etiqueta rigurosa",
  "Etiqueta",
  "Cóctel",
  "Semiformal",
  "Casual",
  "Smart casual",
  "Informal",
];

const FormCreateInvitation = () => {
  const { form, errors, handleChange, handleEventValidation } = useForm(
    initialForms,
    validationsForm
  );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const $user = useStore(userLog);

  useEffect(() => {
    setUser($user);
  }, [$user]);

  const handleCreateInvitation = (e) => {
    e.preventDefault();
    if (
      !validFields.name ||
      !validFields.time ||
      !validFields.date ||
      !validFields.direction ||
      !validFields.dressCode
    ) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Revisa tus datos",
        customClass: "fs-lg",
      });
      return;
    }

    const designId = window.location.href.split("=")[1];
    const uuid = uuidv4();

    uploadInvitationData({
      id: uuid,
      eventName: form.name,
      date: form.date,
      time: form.time,
      address: form.direction,
      dressCode: form.dressCode,
      designId,
      userId: user.id,
    });

    confetti({
      particleCount: 150,
    });

    Swal.fire({
      title: "Felicidades",
      icon: "success",
      text: "Su invitacion esta lista",
      customClass: "fs-lg",
    }).then((res) => {
      if (res.isConfirmed) {
        setTimeout(() => {
          window.location.href = `/finish?invitation=${uuid}`;
        }, 500);
      }
    });
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="form">
      <h1>Bien, elegiste una plantilla.</h1>
      <p>Ahora solo debes de llenar los siguientes datos.</p>
      <form
        className="form__inputs margin__top-md"
        onSubmit={handleCreateInvitation}
      >
        <div className="margin__bottom-lg">
          <FormInput
            type="text"
            name="name"
            placeholder="Nombre del evento"
            icon="fa-solid fa-user"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.name}
            error={errors.name}
          />
        </div>
        <div className="margin__bottom-lg">
          <FormInput
            type="date"
            name="date"
            placeholder="Correo Electrónico"
            icon="fa-solid fa-calendar-days"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.date}
            error={errors.date}
          />
        </div>
        <div className="margin__bottom-lg">
          <FormInput
            type="time"
            name="time"
            placeholder="Correo Electrónico"
            icon="fa-solid fa-clock"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.time}
            error={errors.time}
          />
        </div>
        <div className="margin__bottom-lg">
          <FormInput
            type="text"
            name="direction"
            placeholder="Dirección del evento"
            icon="fa-solid fa-location-dot"
            onChange={handleChange}
            eventValidation={handleEventValidation}
            value={form.direction}
            error={errors.direction}
          />
        </div>
        <div className="margin__bottom-lgg">
          <FormSelect
            onChange={handleChange}
            eventValidation={handleEventValidation}
            error={errors.dressCode}
            options={dressCodeTypes}
          />
        </div>
        <div className="form__buttons">
          <FormButton text="Crear invitación" icon="bx bxs-party" />
        </div>
      </form>
    </div>
  );
};

export default FormCreateInvitation;
