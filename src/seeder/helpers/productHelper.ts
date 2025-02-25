import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedProductsAndVariants(categories: Array<{ id: string; name: string }>) {
    for (const category of categories) {
        const amountOfProductsInCategory = faker.number.int({ min: 4, max: 8 });

        for (let i = 0; i < amountOfProductsInCategory; i++) {
            const productName = faker.commerce.productName();
            const productDescription = faker.commerce.productDescription();
            const brand = faker.company.name();
            const product = await prisma.product.create({
                data: {
                    name: productName,
                    description: productDescription,
                    brand: brand,
                    categoryId: category.id
                }
            });

            const minimalAmountOfVariantsPerProduct = 1;
            const maximalAmountOfVariantsPerProduct = 4;

            const numVariants = faker.number.int({ min: minimalAmountOfVariantsPerProduct, max: maximalAmountOfVariantsPerProduct });

            for (let j = 0; j < numVariants; j++) {
                const color = faker.color.human();
                const size = faker.helpers.arrayElement(sizes);
                const sku = generateSKU(productName, color, size);
                const price = parseFloat(faker.commerce.price({ min: 10, max: 200 }));
                const inventory = faker.number.int({ min: 0, max: 100 });

                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        color: color,
                        size: size,
                        sku: sku,
                        price: price,
                        inventory: inventory
                    }
                });
            }
        }
    }
}

function generateSKU(productName: string, color: string, size: string): string {
	const abbreviate = (str: string, length: number): string => {
		return str.replace(/[^A-Za-z0-9]/g, '').toUpperCase().substring(0, length);
    };
    const nameAbbrev = abbreviate(productName, 3);
    const colorAbbrev = abbreviate(color, 3);
    const sizeAbbrev = abbreviate(size, 2);
    const randomNum = faker.number.int({ min: 100, max: 999 });
    return `${nameAbbrev}-${colorAbbrev}-${sizeAbbrev}-${randomNum}`;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL'];