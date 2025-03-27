const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Usuario de tu base de datos
  password: "@ndre2025", // Contraseña de tu base de datos
  database: "colegio", // Nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos");
});

// Ruta para el login
app.post("/login", (req, res) => {
  const { correo, contrasena } = req.body;

  // Verifica las credenciales del usuario en la base de datos
  const query = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
  db.query(query, [correo, contrasena], (err, results) => {
    if (err) {
      return res.status(500).send("Error de servidor");
    }

    if (results.length > 0) {
      // Si las credenciales son correctas, devuelve un mensaje de éxito
      return res.status(200).json({ message: "Login exitoso", user: results[0] });
    } else {
      // Si las credenciales son incorrectas
      return res.status(401).send("Credenciales incorrectas");
    }
  });
});

// Ruta para obtener los alumnos (si el login es exitoso)
app.get("/alumnos", (req, res) => {
  const query = "SELECT * FROM alumnos";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error al obtener los alumnos");
    }
    res.status(200).json(results);
  });
});

// Rutas para grados y maestros (similar a los alumnos)
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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Página de login
});

app.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'panel.html')); // Panel después de login
});
