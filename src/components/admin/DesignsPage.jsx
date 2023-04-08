import { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";

import { userLog } from "../../helpers/auth/getUserLogged";
import { getUsers } from "../../helpers/admin/getUsers";

import { LoadingPage } from "../LoadingPage";
import { Page404 } from "../Page404";
import { Categories } from "./Categories";

export const DesignsPage = () => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const $user = useStore(userLog);

  useEffect(() => {
    setUser($user);
  }, [$user]);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return <LoadingPage complete />;
  }

  if (user?.id !== "2d39c43f-ed27-48ec-b331-019b8e577db4" || !user) {
    return <Page404 />;
  }

  return (
    <section className="container mt__100 margin__bottom-lgg">
      <h2 className="subtitle">Diseños</h2>
      <div className="title__section-page">
        <h3>Categorias:</h3>
        <Categories />
      </div>
    </section>
  );
};
