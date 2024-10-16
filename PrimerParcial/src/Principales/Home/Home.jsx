/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./styles.css";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const getRecetas = async () => {
  const dishesFetch = await fetch("http://localhost:3000/dishes");
  const dishes = await dishesFetch.json();
  return dishes;
};

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); 
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState("");
  const [type, setType] = useState("");

  const buttonIsDisabled = !image || !name || !description || !preparation || !type;

  const refreshReceta = async () => {
    const updatedReceta = await getRecetas();
    setDishes(updatedReceta);
  };

  useEffect(() => {
    refreshReceta();
  }, []);

  const handleAddRecetaClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddReceta = async () => {
    const response = await fetch("http://localhost:3000/dishes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, name, description, preparation, type }),
    });

    if (response.ok) {
      setModalOpen(false); 
      refreshReceta();       
      setImage("");
      setName("");
      setDescription("");
      setPreparation("");
      setType("");
    }
  };

  return (
    <div>
      <div className="home-title">
        <h1>Libro de Recetas: La NoNa</h1>
        <button onClick={handleAddRecetaClick} className="add-button">
          Agregar Receta
        </button>
      </div>

      {dishes.length ? (
        <div className="home-grid-cards">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              id={dish.id}
              image={dish.image}
              name={dish.name}
              type={dish.type}
              refreshReceta={refreshReceta}
            />
          ))}
        </div>
      ) : (
        <div className="home-no-dishes">No hay recetas para mostrar</div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Agregar Nueva Receta</h2>
        <div>
          <input
            type="text"
            placeholder="Image"
            value={image}
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
            placeholder="Categoría"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <button
          className="add-button"
          onClick={handleAddReceta}
          disabled={buttonIsDisabled}
        >
          Agregar Receta
        </button>
      </Modal>
    </div>
  );
};

export default Home;
