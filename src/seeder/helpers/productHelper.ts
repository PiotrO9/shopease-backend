import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

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

function collectLeafCategories(category: any): Array<{ id: string; name: string }> {
    if (!category.children || category.children.length === 0) {
        return [{ id: category.id, name: category.name }];
    }

    let leaves: Array<{ id: string; name: string }> = [];

    for (const child of category.children) {
        leaves = leaves.concat(collectLeafCategories(child));
    }
	
    return leaves;
}

export async function seedProductsAndVariants(categories: Array<{ id: string; name: string; children?: any[] }>) {
    let leafCategories: Array<{ id: string; name: string }> = [];

    for (const cat of categories) {
        leafCategories = leafCategories.concat(collectLeafCategories(cat));
    }

    for (const category of leafCategories) {
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

            const numVariants = faker.number.int({ min: 1, max: 4 });
			
            for (let j = 0; j < numVariants; j++) {
                const color = faker.color.human();
                const size = faker.helpers.arrayElement(sizes);
                const sku = generateSKU(productName, color, size);
                const price = parseFloat(faker.commerce.price({ min: 10, max: 200 }));
                const inventory = faker.number.int({ min: 0, max: 100 });

                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        variant: color,
                        size: size,
                        sku: sku,
                        price: price,
                        inventory: inventory,
                        image: faker.image.urlPicsumPhotos({ width: 400, height: 400, blur: 0, grayscale: false })
                    }
                });
            }
        }
    }
}
