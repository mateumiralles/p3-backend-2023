import { Router } from "express";
import { errorChecked } from "./utils.js";
import prisma from "./prisma-client.js";

const router = Router({ mergeParams: true });


router.get(
    "/",
    errorChecked(async (req, res) => {
        const { teamId } = req.params;
        const newPlayer =  await prisma.player.findMany({
            where: { teamId: Number(teamId) },
          });
          res.status(200).json(newPlayer);
        })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const { teamId } = req.params;
    const newPlayer = await prisma.player.create({
      data: { ...req.body, teamId: Number(teamId) },
    });
    res.status(200).json({ newPlayer, params: req.params });
  })
);

router.put(
    "/:id",
    errorChecked(async (req, res) => {
      const { id, teamId } = req.params;
  
      const updatedPlayer = await prisma.player.update({
        where: { id: Number(id) },
        data: {
          ...req.body,
          teamId: Number(teamId),
        },
      });
      res.status(200).json({ updatedPlayer, params: req.params });
    })
  );
  
  router.delete(
    "/:id",
    errorChecked(async (req, res) => {
      const { id } = req.params;
  
      const deletedPlayer = await prisma.player.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ deletedPlayer, params: req.params });
    })
  );

export default router;
