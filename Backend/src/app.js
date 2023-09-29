const express = require("express");
const dbConnection = require("./db.js")
// const moment = require('moment');
const cors = require("cors");
const app = express();
// const tiempo = moment();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send("Server on port 5000");
});

app.get("/Get", function (req, res) {
    dbConnection.connect(function (err) {
        if (err) throw err;
        var sql = `SELECT * FROM operaciones`;
        dbConnection.query(sql, function (err, result) {
            if (err) throw err;
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

    var result = 0.0;

    switch (operacion.Op) {
        case '+':
            result = operacion.Num1 + operacion.Num2;
            break;
        case '-':
            result = operacion.Num1 - operacion.Num2;
            break;
        case '*':
            result = operacion.Num1 * operacion.Num2;
            break;
        case '/':
            if (operacion.Num2 === 0){

            }
            result = operacion.Num1 + operacion.Num2;
            break;
        default:
            console.log('Este es el caso por defecto');
    }

    dbConnection.connect(function (err) {
        if (err) throw err;
        var sql = `INSERT INTO operaciones (id, num1, num2, operacion, result, fecha) VALUES (NULL, ?, ?, ?, ?, ?)`;
        dbConnection.query(sql, function (err, result) {
            if (err) throw err;
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

app.listen(5000, () => console.log("Server on port 5000"));