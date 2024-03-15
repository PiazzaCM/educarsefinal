import React from 'react';

const notFoundStyles = {
    backgroundColor: 'black',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

const NotFound = () => {
  return (
    <div style={notFoundStyles}>
      <h1>Error 404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFound;
