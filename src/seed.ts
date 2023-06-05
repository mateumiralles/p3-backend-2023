import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const u1 = await prisma.usuario.create({
  data: { nombre: "joel" },
});
console.log(`Se ha creado el usuario ${u1.nombre} (${u1.id})`);

const u2 = await prisma.usuario.create({
  data: { nombre: "victor" },
});
console.log(`Se ha creado el usuario ${u2.nombre} (${u2.id})`);

await prisma.entrenamiento.createMany({
  data: [
    {
      nombre: "Piernas",
      tiempo: 30,
      usuarioId: u1.id,
    },
    {
      nombre: "Torso",
      tiempo: 40,
      usuarioId: u2.id,
    },
  ],
});
