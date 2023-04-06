import React from "react";

export const Page404 = () => {
  return (
    <div className="page__complete center__section">
      <div className="center__section-column" style={{ width: "100%" }}>
        <div className="w-40">
          <img src="/images/404.svg" alt="404" />
        </div>
        <a href="/" className="button__link">
          Ir al Inicio
        </a>
      </div>
    </div>
  );
};
