import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import validator from "validator";
import emailjs from "@emailjs/browser";

import { userLog } from "../../helpers/auth/getUserLogged";
import { useForm } from "../../hooks/useForm";
import { useStore } from "@nanostores/react";

import { FormButton } from "./FormButton";
import { FormInput } from "./FormInput";
import { LoadingPage } from "../LoadingPage";

const initialForms = {
  name: "",
  email: "",
  message: "",
};

const validFields = {
  name: false,
  email: false,
};

const validationsForm = (form, e) => {
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

  return errors;
};

export const ContactForm = () => {
  const { form, errors, handleChange, handleEventValidation } = useForm(
    initialForms,
    validationsForm
  );

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const $user = useStore(userLog);

  useEffect(() => {
    setUser($user);
  }, [$user]);

  const serviceId = "service_l7c1mvj";
  const templateId = "template_7l5lpfw";
  const idEmail = "Zz0X-xgpxN5rS44Xx";
  const defaultMessage =
    "Hola, Invit.Arte, Quiero celebrar una fecha importante 🥳. ¿Me ayudarías a crear mi invitación? 👉👈";

  const handleSendMessageOfUser = (e) => {
    e.preventDefault();
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: user.name,
          email_id: user.email,
          message: form.message === "" ? defaultMessage : form.message,
          reply_to: user.email,
        },
        idEmail
      )
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Gracias por escribirnos ❤️",
          text: "Te contestaremos lo antes posible.",
          showConfirmButton: false,
          timer: 1500,
          customClass: "fs-lg",
        })
      )
      .catch((err) => console.log(err));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!validFields.name || !validFields.email) {
      Swal.fire({
        title: "Algo anda mal",
        icon: "warning",
        text: "Revisa tus datos",
        customClass: "fs-lg",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          email_id: form.email,
          message: form.message === "" ? defaultMessage : form.message,
          reply_to: form.email,
        },
        idEmail
      )
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Gracias por escribirnos ❤️",
          text: "Te contestaremos lo antes posible.",
          showConfirmButton: false,
          timer: 1500,
          customClass: "fs-lg",
        })
      )
      .catch((err) => console.log(err));
  };

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="form">
      <h1>Envíanos un mensaje</h1>
      <p>Te contestaremos lo antes posible.</p>
      <form
        className="form__inputs margin__top-md"
        onSubmit={user ? handleSendMessageOfUser : handleSendMessage}
      >
        {!user && (
          <div>
            <div className="margin__bottom-md">
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
          </div>
        )}

        <textarea
          className="form__textarea margin__bottom-lg"
          name="message"
          id=""
          rows="7"
          placeholder="Mensaje"
          onChange={handleChange}
          value={form.message}
        ></textarea>
        <div className="form__buttons">
          <FormButton text="Enviar" icon="fa-solid fa-paper-plane" />
        </div>
      </form>
    </div>
  );
};
