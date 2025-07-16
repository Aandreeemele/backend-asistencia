import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const app = express();
  const PORT = 8000;

  app.use(cors({
    origin: ["http://127.0.0.1:5500", "https://aandreeemele.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));

  app.use(express.json());

  const db = await mysql.createConnection({
    host: "b2lze9yht73glvbix2y6-mysql.services.clever-cloud.com",
    port: 3306,
    user: "ubbkutvq3mqshiha",
    password: "ICl5QtkL2qxedMmYLXlw",
    database: "b2lze9yht73glvbix2y6",
  });

  console.log("✅ Conexión a MySQL establecida");

  // LOGIN SIN ENCRIPTACIÓN
  app.post("/login", async (req, res) => {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ error: "Correo y contraseña requeridos" });
    }

    try {
      const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);

      if (rows.length === 0) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const usuario = rows[0];

      if (contrasena !== usuario.contraseña) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const { id, nombre, apellido, rol } = usuario;
      res.json({ id, correo, nombre, apellido, rol });

    } catch (err) {
      console.error("❌ Error en /login:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // REGISTRO SIN ENCRIPTACIÓN
  app.post("/registro", async (req, res) => {
    const { correox, nombrex, clavex, rolx, apellidox } = req.body;

    if (!correox || !nombrex || !clavex || !rolx) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
      const [existe] = await db.query("SELECT id FROM usuarios WHERE correo = ?", [correox]);
      if (existe.length > 0) {
        return res.status(409).json({ error: "El correo ya está registrado" });
      }

      await db.query(
        "INSERT INTO usuarios (correo, nombre, contraseña, apellido, rol) VALUES (?, ?, ?, ?, ?)",
        [correox, nombrex, clavex, apellidox || null, rolx || "maestro"]
      );

      res.json({ mensaje: "✅ Usuario registrado correctamente" });
    } catch (err) {
      console.error("❌ Error en /registro:", err);
      res.status(500).json({ error: "Error interno del servidor al registrar usuario" });
    }
  });

  // CAMBIO DE CONTRASEÑA SIN ENCRIPTACIÓN
  app.post("/cambiar-contrasena", async (req, res) => {
    const { correo, nuevaContrasena, nuevoNombre, nuevoApellido } = req.body;

    if (!correo || !nuevaContrasena) {
      return res.status(400).json({ error: "Correo y nueva contraseña requeridos" });
    }

    try {
      await db.query(
        `UPDATE usuarios 
         SET contraseña = ?, 
             nombre = COALESCE(?, nombre), 
             apellido = COALESCE(?, apellido) 
         WHERE correo = ?`,
        [nuevaContrasena, nuevoNombre, nuevoApellido, correo]
      );
      res.json({ mensaje: "✅ Contraseña actualizada" });
    } catch (err) {
      console.error("❌ Error al cambiar contraseña:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // ENVIAR CÓDIGO AL CORREO
app.post("/enviar-codigo", async (req, res) => {
  const { correo, codigo } = req.body;

  if (!correo || !codigo) {
    return res.status(400).json({ error: "Correo y código son requeridos" });
  }

  // Configura tu correo (usa uno de Gmail o institucional que permita SMTP)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aamelendez@scl.edu.gt",       
      pass: "rockemma"        
    }
  });

  const mailOptions = {
    from: "SCL Asistencia <tucorreo@gmail.com>",
    to: correo,
    subject: "Código de recuperación",
    text: `Tu código de verificación es: ${codigo}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Código enviado a:", correo);
    res.status(200).json({ mensaje: "Correo enviado correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
});


  // OBTENER NIVELES ACADÉMICOS
  app.get("/niveles", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM niveles_academicos");
      res.json(rows);
    } catch (err) {
      console.error("❌ Error al obtener niveles:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // OBTENER ALUMNOS
  app.get("/alumnos", async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, nombre, grado AS grado, correo, telefono, 
               conteo_asistio, conteo_tarde, conteo_noasistio, 
               asistencia, asistencia_hora
        FROM alumnos
      `);
      res.json(rows);
    } catch (err) {
      console.error("❌ Error al obtener alumnos:", err.message);
      res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
    }
  });

  // AGREGAR ALUMNO
  app.post("/alumnos", async (req, res) => {
    const { nombre, grado, correo, telefono } = req.body;

    if (!nombre || !grado) return res.status(400).json({ error: "Faltan datos obligatorios" });

    try {
      await db.query(
        "INSERT INTO alumnos (nombre, grado, correo, telefono) VALUES (?, ?, ?, ?)",
        [nombre, grado, correo, telefono]
      );
      res.json({ mensaje: "Alumno agregado correctamente" });
    } catch (err) {
      console.error("❌ Error al agregar alumno:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // ELIMINAR ALUMNO
  app.delete("/alumnos/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const [resultado] = await db.query("DELETE FROM alumnos WHERE id = ?", [id]);
      if (resultado.affectedRows === 0) return res.status(404).json({ error: "Alumno no encontrado" });
      res.json({ mensaje: "Alumno eliminado correctamente" });
    } catch (err) {
      console.error("❌ Error al eliminar alumno:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // ACTUALIZAR ASISTENCIA
  app.put("/alumnos/:id/asistencia", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) return res.status(400).json({ error: "Falta el estado de asistencia" });

    try {
      const horaActual = new Date();
      let campoConteo;

      if (estado === "asistio") campoConteo = "conteo_asistio";
      else if (estado === "tarde") campoConteo = "conteo_tarde";
      else if (estado === "noasistio") campoConteo = "conteo_noasistio";
      else return res.status(400).json({ error: "Estado inválido" });

      const query = `
        UPDATE alumnos
        SET asistencia = ?, asistencia_hora = ?, ${campoConteo} = ${campoConteo} + 1
        WHERE id = ?
      `;

      const [result] = await db.query(query, [estado, horaActual, id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Alumno no encontrado" });

      res.json({ mensaje: "✅ Asistencia y conteo actualizados", estado, hora: horaActual });
    } catch (err) {
      console.error("❌ Error al actualizar asistencia:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // OBTENER USUARIOS (opcional para interfaz)
  app.get("/usuarios", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, correo, nombre, apellido FROM usuarios");
      res.json(rows);
    } catch (err) {
      console.error("❌ Error al obtener usuarios:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Backend activo en: http://0.0.0.0:${PORT}`);
  });
}

main().catch((error) => {
  console.error("❌ Error iniciando el servidor:", error);
});
