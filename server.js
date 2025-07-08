import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

async function main() {
  const app = express();
  const PORT = 8000;  

  app.use(cors());
  app.use(express.json());

  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@ndre2025",
    database: "Colegio_General",
  });

  console.log("✅ Conexión a MySQL establecida");

  // Rutas

  app.post('/cambiar-contrasena', async (req, res) => {
    const { correo, nuevaContrasena, nuevoNombre, nuevoApellido } = req.body;

    if (!correo || !nuevaContrasena) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    try {
      let query = "UPDATE usuarios SET contraseña = ?";
      const values = [nuevaContrasena];

      if (nuevoNombre) {
        query += ", nombre = ?";
        values.push(nuevoNombre);
      }

      if (nuevoApellido) {
        query += ", apellido = ?";
        values.push(nuevoApellido);
      }

      query += " WHERE correo = ?";
      values.push(correo);

      const [result] = await db.query(query, values);

      return res.json({ mensaje: "✅ Datos actualizados correctamente" });
    } catch (err) {
      console.error("❌ Error al actualizar:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
  });

  app.post("/login", async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
      const [rows] = await db.query(
        "SELECT id, correo, nombre, apellido FROM usuarios WHERE correo = ? AND contraseña = ?",
        [correo, contrasena]
      );

      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (err) {
      console.error("❌ Error en /login:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.post("/registro", async (req, res) => {
    const { correox, nombrex, clavex } = req.body;

    if (!correox || !nombrex || !clavex) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
      const [existe] = await db.query("SELECT id FROM usuarios WHERE correo = ?", [correox]);
      if (existe.length > 0) {
        return res.status(409).json({ error: "El correo ya está registrado" });
      }

      await db.query(
        "INSERT INTO usuarios (correo, nombre, contraseña, apellido) VALUES (?, ?, ?, '')",
        [correox, nombrex, clavex]
      );

      res.json({ mensaje: "Usuario registrado correctamente" });
    } catch (err) {
      console.error("❌ Error en /registro:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  app.get("/niveles", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM niveles_academicos");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/alumnos", async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT id, nombre, grado, correo, telefono, 
               conteo_asistio, conteo_tarde, conteo_noasistio, 
               asistencia, asistencia_hora
        FROM alumnos
      `);
      res.json(rows);
    } catch (err) {
      console.error("❌ Error al obtener alumnos:", err);
      res.status(500).json({ error: "Error al obtener alumnos" });
    }
  });

  app.post("/alumnos", async (req, res) => {
    const { nombre, grado, correo, telefono } = req.body;

    if (!nombre || !grado) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
      await db.query(
        "INSERT INTO alumnos (nombre, grado, correo, telefono) VALUES (?, ?, ?, ?)",
        [nombre, grado, correo, telefono]
      );
      res.json({ mensaje: "Alumno agregado correctamente" });
    } catch (err) {
      console.error("❌ Error al agregar alumno:", err);
      res.status(500).json({ error: "Error al agregar alumno" });
    }
  });

  app.delete("/alumnos/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const [resultado] = await db.query("DELETE FROM alumnos WHERE id = ?", [id]);

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Alumno no encontrado" });
      }

      res.json({ mensaje: "Alumno eliminado correctamente" });
    } catch (err) {
      console.error("❌ Error al eliminar alumno:", err);
      res.status(500).json({ error: "Error al eliminar alumno" });
    }
  });

  app.put("/alumnos/:id/asistencia", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ error: "Falta el estado de asistencia" });
    }

    try {
      const horaActual = new Date();

      let campoConteo;
      if (estado === "asistio") campoConteo = "conteo_asistio";
      else if (estado === "tarde") campoConteo = "conteo_tarde";
      else if (estado === "noasistio") campoConteo = "conteo_noasistio";

      if (!campoConteo) {
        return res.status(400).json({ error: "Estado inválido" });
      }

      const query = `
        UPDATE alumnos
        SET asistencia = ?, asistencia_hora = ?, ${campoConteo} = ${campoConteo} + 1
        WHERE id = ?
      `;

      const [result] = await db.query(query, [estado, horaActual, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Alumno no encontrado" });
      }

      res.json({ mensaje: "✅ Asistencia y conteo actualizados", estado, hora: horaActual });
    } catch (error) {
      console.error("❌ Error al actualizar asistencia:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });

  app.get("/usuarios", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, correo, nombre, apellido FROM usuarios");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`✅ Backend activo en: http://localhost:${PORT}`);
  });
}

main().catch((error) => {
  console.error("❌ Error iniciando el servidor:", error);
});
