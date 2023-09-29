import React, {useState} from "react";
import "../CSS/titulo.css";
import Tabla from './Tabla';
import { Modal, Button } from "react-bootstrap";

function Title() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div  className="box">
    <h1 className="title">
      CALCULADORA SIMPLE
      <span className="title__parpadeo">_</span>
    </h1>

    <Button className="boton" variant="primary" onClick={handleShow}>
        Ver Historial de Operaciones
    </Button>

    <Modal  show={showModal} onHide={handleClose}>
        <Modal.Header style={{backgroundColor: "#7bd5ff"}} closeButton>
          <Modal.Title style={{fontSize: "40px", color: "#212529"}}>Tabla de Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll", height: "398px",backgroundColor: "#212529" }}>
            <Tabla></Tabla>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#7bd5ff"}} >
          <Button variant="dark" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Title;