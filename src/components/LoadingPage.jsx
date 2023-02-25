import React from "react";

export const LoadingPage = ({ complete }) => {
  if (complete) {
    return (
      <section className="page__complete center__section">
        <div className="center__section-column" style={{ width: "100%" }}>
          <span className="loader"></span>
        </div>
      </section>
    );
  }

  return (
    <div className="center__section-column" style={{ width: "100%", height: '400px'}}>
      <span className="loader"></span>
    </div>
  );
};
