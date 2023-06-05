import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

// GET /usuarios/
// GET /usuarios/:id
// POST /usuario/
// PUT /usuario/:id
// DELETE /usuario/:id

// GET /usuario/entrenamientos

router.get("/", async (req, res) => {
  try {
    const result = await prisma.usuario.findMany({});
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (usuario === null) {
        res.status(404).json({error: `Usuario de id:${id} no ha sido encontrado!`})
    }
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

export default router;
