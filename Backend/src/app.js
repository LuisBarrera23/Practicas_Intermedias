const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const moment = require('moment-timezone');
moment.tz.setDefault('America/Guatemala');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configura la conexión de piscina a la base de datos
const pool = mysql.createPool({
    host: 'mysql-db',
    user: 'root',
    password: '1234',
    database: 'pi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.on('error', (err) => {
    console.error('MySQL Pool Error: ' + err.message);
});

app.get("/", function (req, res) {
    res.send("Server on port 5000");
});

app.get("/Get", function (req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection: ' + err);
            res.status(500).send('Internal Server Error');
            return;
        }

        var sql = `SELECT * FROM operaciones`;
        connection.query(sql, (err, result) => {
            connection.release();
            if (err) {
                console.error('Error executing MySQL query: ' + err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const history = result.map(register => ({
                "Id": register.id,
                "Num1": register.num1,
                "Num2": register.num2,
                "Result": register.result,
                "Op": register.operacion,
                "Fecha": register.fecha,
            }));
            res.send(history);
        });
    });
});

app.post("/Insertar", function (req, res) {
    const operacion = req.body;
    console.log(operacion)

    var finalresult = 0.0;

    switch (operacion.operacion) {
        case '+':
            finalresult = operacion.num1 + operacion.num2;
            break;
        case '-':
            finalresult = operacion.num1 - operacion.num2;
            break;
        case '*':
            finalresult = operacion.num1 * operacion.num2;
            break;
        case '/':
            if (operacion.num2 === 0) {
                res.send({ mensaje: "Division entre 0!", resultado: 0 });
                break;
            }
            finalresult = operacion.num1 / operacion.num2;
            break;
        default:
            res.send({ mensaje: "Operacion no encontrada", resultado: 0 });
            console.log('Este es el caso por defecto');
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection: ' + err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const tiempo = moment();
        const temp = tiempo.format('YYYY/MM/DD HH:mm:ss');

        var sql = `INSERT INTO operaciones (num1, num2, operacion, result, fecha) VALUES (?, ?, ?, ?, ?)`;
        connection.query(sql, [operacion.num1, operacion.num2, operacion.operacion, finalresult, temp], (err, result) => {
            connection.release();
            if (err) {
                console.error('Error executing MySQL query: ' + err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log({ mensaje: "ok", resultado: finalresult })
            res.send({ mensaje: "ok", resultado: finalresult });
        });
    });
});

app.listen(8080, () => console.log("Server on port 5000"));
