import React from "react";
import Navbar from "../components/Navbar";
import "../components/css/mensajes.css";

const Mensajes = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="row col-12">
          <div className="col-12 col-md-3 chat">
            <div className="mt-4">
              <ul className="list-group">
                <li className="list-group-item">Chat 1</li>
                <li className="list-group-item">Chat 2</li>
                <li className="list-group-item">Chat 3</li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-9 mensaje">
            <div className="container container-chat d-flex col-12 rounded mt-4">
              <div className="container-chat">
                <h2 className="mt-4">Juan Perez</h2>
                <hr className="divider" />
                <div className="col-12 contenido">
                  aaaa
                </div>
                <hr className="divider" />
                <div className="col-12 d-flex flex-column align-items-end">
                  <div className="col-12 d-flex align-items-center">
                    <input className="form-control rounded-lg" type="text" />
                    <button className="btn boton2">uwu</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mensajes;

