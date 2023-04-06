import { useEffect, useState } from "react";

import { useStore } from "@nanostores/react";

import { userLog } from "../../helpers/auth/getUserLogged";
import { getUsers } from "../../helpers/admin/getUsers";

import { LoadingPage } from "../LoadingPage";
import { Page404 } from "../Page404";
import { UserCard } from "./UserCard";
import { ButtonCreateUser } from "./ButtonCreateUser";

export const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [listUsers, setListUsers] = useState([]);

  const [user, setUser] = useState(null);
  const $user = useStore(userLog);

  useEffect(() => {
    setUser($user);
  }, [$user]);

  useEffect(() => {
    getUsers().then((data) => setListUsers(data));
  }, []);

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
      <h2 className="subtitle">Usuarios</h2>
      <div className="options__buttons">
        <ButtonCreateUser />
      </div>
      <div className="grid">
        {listUsers
          .filter((user) => user.email !== "admin@gmail.com")
          .map((user, i) => (
            <UserCard key={user.id} {...user} numUser={i} />
          ))}
      </div>
    </section>
  );
};
