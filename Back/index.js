import express from "express";
import cors from "cors";
import { pool } from "./helpers/pool.js";
const app = express();
const port = 3000;

// Midlewares
app.use(express.json());
app.use(cors());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Conexión exitosa", time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al conectar a la base de datos" });
  }
});

// get
app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});

//post
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    await pool.query(
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)",
      [titulo, img, descripcion]
    );
    res.json({ message: "Post añadido" });
  } catch (error) {
    console.log(error);
  }
});

// put Likes
app.put("/posts/like/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
    res.json({ message: "Like añadido" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
