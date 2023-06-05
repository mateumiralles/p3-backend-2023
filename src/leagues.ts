import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();


// GET /usuario/entrenamientos

router.get("/", async (req, res) => {
  try {
    const leagues = await prisma.league.findMany({});
    res.status(200).json(leagues);
  } catch (e) {
    res.status(500).json({ type: e.constructor.name, message: e.toString() });
  }
});

router.post("/", async (req,res) => {
  try{
    const newLeague = await prisma.league.create({
      data: req.body,
    });
    res.status(200).json(newLeague);
  }
  catch (e){
    res.status(500).json({ type: e.constructor.name, message: e.toString() });
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const league = await prisma.league.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (league === null) {
      res
        .status(404)
        .json({ error: `Liga de id:${id} no ha sido encontrada!` });
    }
    res.status(200).json(league);
  } catch (e) {
    res.status(500).json({ type: e.constructor.name, message: e.toString() });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLeague = await prisma.league.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedLeague);
  } catch (e) {
    res.status(500).json({ type: e.constructor.name, message: e.toString() });
  }
});

router.delete("/:id", async (req, res)=>{
  const {id} = req.params;
  try{
    const deletedLeague = await prisma.league.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedLeague);
  }
  catch (e) {
    res.status(500).json({ type: e.constructor.name, message: e.toString() });
  }
})
export default router;
