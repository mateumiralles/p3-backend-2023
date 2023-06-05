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
    const leagues = await prisma.league.findMany({});
    res.status(200).json(leagues);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const leagues = await prisma.league.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (leagues === null) {
        res.status(404).json({error: `Liga de id:${id} no ha sido encontrada!`})
    }
    res.status(200).json(leagues);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

export default router;
