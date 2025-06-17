const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));  


const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "@ndre2025", 
  database: "colegio", 
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos");
});


app.post("/cambiar-contrasena", (req, res) => {
  const { correo, nuevaContrasena } = req.body;

  const query = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
  db.query(query, [nuevaContrasena, correo], (err, result) => {
    if (err) {
      console.error("Error al actualizar contraseña:", err);
      return res.status(500).json({ message: "Error al actualizar la contraseña" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  });
});


app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;


  const query = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
  db.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      return res.status(500).send("Error de servidor");
    }

    if (results.length > 0) {
    
      return res.status(200).json({ message: "Login exitoso", user: results[0] });
    } else {
 
      return res.status(401).send("Credenciales incorrectas");
    }
  });
});


app.get("/alumnos", (req, res) => {
  const query = "SELECT * FROM alumnos";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error al obtener los alumnos");
    }
    res.status(200).json(results);
  });
});

app.get("/grados", (req, res) => {
  const query = "SELECT * FROM subgrados";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error al obtener los grados");
    }
    res.status(200).json(results);
  });
});

app.get("/maestros", (req, res) => {
  const query = "SELECT * FROM maestros";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error al obtener los maestros");
    }
    res.status(200).json(results);
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); 
});

app.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'panel.html')); 
});
