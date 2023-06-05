import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";

const router = Router({ mergeParams: true });

router.get(
  "/",
  errorChecked(async (req, res) => {
    const { leagueId } = req.params;
    const teams = await prisma.team.findMany({
      where: { leagueId: Number(leagueId) },
    });
    res.status(200).json(teams);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const { leagueId } = req.params;
    const newTeam = await prisma.team.create({
      data: { ...req.body, leagueId: Number(leagueId) },
    });
    res.status(200).json({ newTeam, params: req.params });
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id, leagueId } = req.params;

    const updatedTeam = await prisma.team.update({
      where: { id: Number(id) },
      data: {
        ...req.body,
        leagueId: Number(leagueId),
      },
    });
    res.status(200).json({ updatedTeam, params: req.params });
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;

    const deletedTeam = await prisma.team.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ deletedTeam, params: req.params });
  })
);

export default router;
