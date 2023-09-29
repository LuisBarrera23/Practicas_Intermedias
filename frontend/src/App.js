import './App.css';
import Calculadora from "./components/Calculadora"
import Titulo from "./components/titulo"

function App() {
  return (

    <div className="container">
      <div className="row">
        <div className="col"><Calculadora/></div>
        <div className="col"> <Titulo/>  </div>
    </div>
   </div>
  );
}

export default App;
