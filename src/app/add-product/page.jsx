//import React from 'react'
import React, { useState } from 'react';

const AddProduct = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
  
    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor
  
      // Ejemplo: Mostrar los datos en la consola
      console.log('Nombre:', nombre);
      console.log('Email:', email);
      console.log('Mensaje:', mensaje);
  
      // Puedes agregar lógica adicional aquí, como enviar los datos a un servidor
    };
  
    return (
      <div>
        <h1>Formulario</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Mensaje:
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  };

export default AddProduct