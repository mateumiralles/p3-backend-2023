import {Router} from'express';
import prisma from './prisma-client.js';

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

  export default router;