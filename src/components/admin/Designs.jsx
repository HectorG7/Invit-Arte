import { useEffect, useState } from "react";
import { getDesignsByCategorie } from "../../helpers/admin/getCategories";
import { Design } from "./Design";

export const Designs = ({ categorie }) => {
  const [designs, setDesigns] = useState();

  useEffect(() => {
    getDesignsByCategorie(categorie).then((data) => setDesigns(data));
  }, [categorie]);

  const { designs: listDesigns } = designs || [];

  return (
    <div className="grid">
      {listDesigns?.length > 0 ? (
        listDesigns?.map((design, i) => (
          <Design {...design} key={design.id} number={i + 1} />
        ))
      ) : (
        <span className="warning">No existen Diseños</span>
      )}
    </div>
  );
};
