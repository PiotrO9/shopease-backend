import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seeder = async () =>  {
    console.log('Clearing database...');
    await prisma.refreshToken.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('Database cleared successfully!');
}
