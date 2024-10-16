/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

const getByID = async (id) => {
  const dishFetch = await fetch("http://localhost:3000/dishes/" + id);
  const dish = await dishFetch.json();
  return dish;
};


const Edit = () => {
    
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [preparation, setPreparation] = useState("");
    const [type, setType] = useState("");
    const [dish, setDish] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getByID(id).then((dish) => setDish(dish));
  }, [id]);
//   const buttonIsDisabled = !image || !name || !description || !preparation || !type;


  const handleEditReceta = async () => {
    const response = await fetch("http://localhost:3000/dishes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, name, description, preparation, type }),
    });

    if (response.ok) {
      setImage("");
      setName("");
      setDescription("");
      setPreparation("");
      setType("");
    }
    navigate('/');
  };
  return (
    <div className="container">
      <h1>Editar</h1>
      <div>
          <input
            type="text"
            placeholder="Imagen"
            value = {image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Receta"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Preparacion"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Categoria"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <button
          className="add-button"
          onClick={handleEditReceta}
        //   disabled={buttonIsDisabled}
        >
          Editar Receta
        </button>
    </div>
  );
};

export default Edit;