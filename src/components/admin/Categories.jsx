import { useEffect, useState } from "react";
import { getCategories } from "../../helpers/admin/getCategories";
import { Designs } from "./Designs";

export const Categories = () => {
  const [listCategories, setListCategories] = useState([]);
  const [categorie, setCategorie] = useState(1);

  useEffect(() => {
    getCategories().then((data) => setListCategories(data));
  }, []);

  const categorieActive = listCategories.find((cat) => cat.id === categorie);

  return (
    <>
      <div className="options__buttons">
        <ul>
          {listCategories.map(({ id, name }) => (
            <li key={name}>
              <button
                className={`${categorie === id ? "second" : "primary"}`}
                onClick={() => setCategorie(id)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="">{categorieActive?.name}</h4>
        <Designs categorie={categorieActive?.id} />
      </div>
    </>
  );
};
