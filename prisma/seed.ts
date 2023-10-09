import { PrismaClient } from '@prisma/client';
import dbSeed from '../data/dbSeed';

const prisma = new PrismaClient();

async function main() {
  const models = Object.keys(dbSeed);
  const data: { [key: string]: any } = dbSeed;
  const prismaClient: { [key: string]: any } = prisma;

  for (let i = 0; i < models.length; i++) {
    const targetModel = data[models[i]];

    for (let j = 0; j < targetModel.length; j++) {
      const item = targetModel[j];
      const result = await prismaClient[models[i]].upsert({
        where: {
          id: item.id,
        },
        update: {},
        create: item,
      });
      console.log(result);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
