import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, keywords, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Taller Pérez & Pérez",
  keywords: "sistema, crm, clientes, carros",
  description: "Consulta de clientes",
};
export default Meta;
