import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Tabla = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await axios.get('http://localhost:8080/Get');
          setData(response.data);
        }
        fetchData();
    }, []);



  return (
    <Table className="table table-striped table-dark" padding="60px">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Numero 1</th>
          <th scope="col">Numero 2</th>
          <th scope="col">Operacion</th>
          <th scope="col">Resultado</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
            <tr key={item.Id}>
                <th scope="row">{item.Id}</th>
                <td>{item.Num1}</td>
                <td>{item.Num2}</td>
                <td>{item.Op}</td>
                <td>{item.Result}</td>
                <td>{item.Fecha}</td>
            </tr>
            ))}
      </tbody>
    </Table>
  );
};

export default Tabla;
