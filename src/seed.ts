import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const l1 = await prisma.league.create({
  data: { name: 'LaLiga'},
});
console.log(`Se ha creado la liga ${l1.name} (${l1.id})`);

const l2 = await prisma.league.create({
  data: { name: "PremiereLeague" },
});
console.log(`Se ha creado la liga ${l2.name} (${l2.id})`);

await prisma.team.createMany({
  data: [
    {
      name: "FC Barcelona",
      leagueId: l1.id
    },
    {
      name: "Real Madrid CF",
      leagueId: l1.id,
    },
    {
      name: "Manchester City FC",
      leagueId: l2.id,
    },
  ],
});
