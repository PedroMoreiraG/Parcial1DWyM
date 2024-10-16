/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const deleteReceta = async (id) => {
  const recetaDelete = await fetch("http://localhost:3000/dishes/" + id, {
    method: "DELETE",
  });

  return recetaDelete;
};

const Card = ({ image, id, name, type, refreshReceta }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/details/${id}`);
  };

  const handleDeleteClick = async () => {
    const response = await deleteReceta(id);
    if (response.ok) {
      refreshReceta();
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-img">{image}</h2>
        <h2 className="card-subtitle">Receta: {name}</h2>
        <h2 className="card-subtitle">Categoria: {type}</h2>
        <div className="card-buttons">
          <button className="card-button" onClick={handleDetailsClick}>
            Detalle
          </button>
          <button className="card-button" onClick={handleDeleteClick}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
