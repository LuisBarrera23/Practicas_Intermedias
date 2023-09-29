import React,  { useState } from "react";
import '../CSS/calculadora.css';
import axios from 'axios';
import { Toast } from "react-bootstrap";

const Calculadora = () => {

    const [msj, setMsj] = useState(false);
    const [msj_ok, setMsj_ok] = useState(false);
    const [mensaje_error, setMensaje_error] = useState("");

    const [texto, setTexto] = useState("0");
    const [numero, setNumero] = useState("");
    const [primero, setPrimero] = useState("");
    const [simbolo, setSimbolo] = useState("");
    const [textSize, setTextSize] = useState('50px');
    const [completado, setCompletado] = useState(false);

    const PresionaNumero = (num) => {
      if (texto === "0" || completado)
      {
        setTextSize('50px')
        setCompletado(false)
        setNumero(num)
        setTexto(num)
        setCompletado(false)
      }else {
        setNumero(numero + num);
        setTexto(texto + num);
        if (texto.length > 8){
          setTextSize('large');
        }
      }      
    };

    const PresionaPunto = () => {
      setNumero(numero + ".");
      setTexto(texto + ".");

      if (texto.length > 8){
        setTextSize('large');
      }
      
     };

    const PresionaDel= () => {
      let temp = numero.substring(0, numero.length - 1)
      if(numero === ""){
        setSimbolo("")
        setNumero(primero)
        setPrimero("")
        setTexto(primero)
      }else{
        if(primero === ""){
          setNumero(temp)
          setTexto(temp)
        }else{
          setNumero(temp)
          setTexto(primero + simbolo + temp)
        }
        
      }      
    };

    const PresionaCE= () => {
      setTextSize('50px')
      setNumero("")
      setPrimero("")
      setTexto("0")
      setSimbolo("")
      setCompletado(false)
    };

    const PresionaSigno= (sig) => {
      if(simbolo === ""){
        if(numero === "" ){
          setMensaje_error("No hay ningun numero para operar")
          setMsj(true)
          return 
        }else{
          setPrimero(numero)
          setNumero("")
        }
        
        switch(sig){
          case "+":
            setSimbolo("+")
            setTexto(numero + "+" )
            break;

          case "-":
            setSimbolo("-")
            setTexto(numero + "-" )
            break;

          case "/":            
            setSimbolo("/")
            setTexto(numero + "/" )
            break;

          case "*":
            setSimbolo("*")
            setTexto(numero + "*" )
            break;
          
          default:
            break;
        }        
      }else{
        setMensaje_error("Solo se pueden operar dos numeros a la vez.")
        setMsj(true)
      }
      
    };


    const PresionaIgual = () => {
      console.log("Numero 1 " + parseFloat(primero))
      console.log("Numero 2 " +parseFloat(numero))
      console.log("Signo " + simbolo)

      axios
      .post('http://localhost:8080/Insertar', {
        'num1': parseFloat(primero),  
        'num2': parseFloat(numero),
        'operacion': simbolo
      })
      .then((res) => {
        if(res.data.mensaje === "ok"){
          var func = texto + "=" + res.data.resultado
          setTexto(func)    
          if (func.length > 9){
            setTextSize('large');
          }
          setCompletado(true)      
          setPrimero("")
          setNumero("")
          setSimbolo("")
          setMsj_ok(true)
        }else{
          setMensaje_error(res.data.mensaje)
          setMsj(true)
        }
        console.log(res.data.mensaje)
        console.log(res.data.resultado)
      })
      .catch((err) => {
        console.error(err)
        setMensaje_error("Error al hacer la peticion")
        setMsj(true)
      }
      );
    }


    return (
      <div className="calculadora">
        <div className="display" style={{ fontSize: textSize }}> {texto} </div>
        <div className="buttons">
          <button className="functionDos" onClick={() => PresionaCE()}>C</button>
          <button className="function" onClick={() => PresionaDel()}> DEL </button>

          <button className="signo" onClick={() => PresionaSigno("/")} >÷</button>

          <button className="numero" onClick={() => PresionaNumero("7")}>7</button>
          <button className="numero" onClick={() => PresionaNumero("8")}>8</button>
          <button className="numero" onClick={() => PresionaNumero("9")}>9</button>

          <button className="signo" onClick={() => PresionaSigno("*")}>*</button>

          <button className="numero" onClick={() => PresionaNumero("4")}>4</button>
          <button className="numero" onClick={() => PresionaNumero("5")}>5</button>
          <button className="numero" onClick={() => PresionaNumero("6")}>6</button>

          <button className="signo"onClick={() => PresionaSigno("-")}>-</button>

          <button className="numero" onClick={() => PresionaNumero("1")}>1</button>
          <button className="numero" onClick={() => PresionaNumero("2")}>2</button>
          <button className="numero" onClick={() => PresionaNumero("3")}>3</button>

          <button className="signo"onClick={() => PresionaSigno("+")}>+</button>

          <button className="numero" onClick={() => PresionaNumero("0")}>0</button>

          <button className="punto" onClick={() => PresionaPunto()}>.</button>
          <button className="igual" onClick={(e) => PresionaIgual()}>=</button>


          
        </div>

        <Toast className="bg-danger" onClose={() => setMsj(false)} show={msj} delay={3000} autohide style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}>
          <Toast.Body className="text-white">
            {mensaje_error}            
          </Toast.Body>
        </Toast>

        <Toast className="text-white bg-success" onClose={() => setMsj_ok(false)} show={msj_ok} delay={3000} autohide style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}>
          <Toast.Body>
            Operacion realizada.            
          </Toast.Body>
        </Toast>
    </div>
    );
}

export default Calculadora;