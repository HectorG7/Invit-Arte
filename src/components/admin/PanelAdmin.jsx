import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { userLog } from "../../helpers/auth/getUserLogged";
import { LoadingPage } from "../LoadingPage";

import { Page404 } from "../Page404";

export const PanelAdmin = () => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});
  const $user = useStore(userLog);

  useEffect(() => {
    setUser($user);
  }, [$user]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return <LoadingPage complete/>;
  }

  if (user?.id !== "2d39c43f-ed27-48ec-b331-019b8e577db4" || !user) {
    return <Page404 />;
  }

  return (
    <div className="page__complete center__section">
      <section className="container margin__bottom">
        <h4 className="subtitle" style={{ marginTop: "150px" }}>
          Opciones de Administrador
        </h4>
        <div className="buttons__container">
          <div className="button__select-container">
            <a href="/admin/users" className="button__select">
              <span>Usuarios</span>
              <img src="/images/undraw_people_re_8spw.svg" alt="s" />
            </a>
          </div>
          <div className="button__select-container">
            <a href="/admin/designs" className="button__select">
              <span>Plantillas</span>
              <img src="/images/undraw_designer_re_5v95.svg" alt="s" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
