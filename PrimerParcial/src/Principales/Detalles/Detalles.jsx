/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

const getByID = async (id) => {
  const dishFetch = await fetch("http://localhost:3000/dishes/" + id);
  const dish = await dishFetch.json();
  return dish;
};

const Details = () => {
  const [dish, setDish] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getByID(id).then((dish) => setDish(dish));
  }, [id]);

  return (
    <div className="container">
      <h1>Detalle</h1>
      {dish && (
        <div>
          <div className="detail">
            <span className="detail-image"> </span>
            <span className="detail-content">{dish.image}</span>
          </div>
          <div className="detail">
            <span className="detail-title">Receta: </span>
            <span className="detail-content">{dish.name}</span>
          </div>
          <div className="detail">
            <span className="detail-title">Descripción: </span>
            <span className="detail-content">{dish.description}</span>
          </div>
          <div className="detail">
            <span className="detail-title">Preparacion: </span>
            <span className="detail-content">{dish.preparation}</span>
          </div>
          <div className="detail">
            <span className="detail-title">Categoria: </span>
            <span className="detail-content">{dish.type}</span>
          </div>
        </div>
      )}
      <button onClick={() => navigate('/')} className="back-button">
        Volver a las recetas de La NoNa
      </button>
    </div>
  );
};

export default Details;