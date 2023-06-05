import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import teamsRouter from "./teams.js";

const router = Router();

// GET /usuario/entrenamientos

router.get(
  "/",
  errorChecked(async (req, res) => {
    const leagues = await prisma.league.findMany({});
    res.status(200).json(leagues);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newLeague = await prisma.league.create({
      data: req.body,
    });
    res.status(200).json(newLeague);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const league = await prisma.league.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(league);
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedLeague = await prisma.league.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedLeague);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedLeague = await prisma.league.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedLeague);
  })
);

router.use("/:leagueId/teams", teamsRouter);

export default router;
