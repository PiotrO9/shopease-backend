import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sizes = ["XS", "S", "M", "L", "XL"];

const products = [
    {
        name: "Basic T-Shirt",
        categoryPath: ["Men Clothing", "Shirts", "Casual Shirts"],
        variants: [
            { name: "Red", baseSku: "TSH-SRT-0001", image: "https://i.postimg.cc/x8LkK7Tb/TSH-SRT-0001.webp" },
            { name: "Black", baseSku: "TSH-SRT-0002", image: "https://i.postimg.cc/59zFdHqN/TSH-SRT-0002.webp" },
            { name: "White", baseSku: "TSH-SRT-0003", image: "https://i.postimg.cc/WbPq22Xm/TSH-SRT-0003.webp" },
            { name: "Brown", baseSku: "TSH-SRT-0004", image: "https://i.postimg.cc/DydJ0tM9/TSH-SRT-0004.webp" }
        ]
    },
    {
        name: "Classic Coat",
        categoryPath: ["Men Clothing", "Jackets", "Windbreakers"],
        variants: [
            { name: "Beige", baseSku: "COT-JCK-0001", image: "https://i.postimg.cc/RFsJSfpN/COT-JCK-0001.webp" }
        ]
    },
    {
        name: "Slim Fit Chinos",
        categoryPath: ["Men Clothing", "Pants", "Chinos"],
        variants: [
            { name: "Beige", baseSku: "PNT-CHN-0001", image: "https://i.postimg.cc/26K3RY3W/PNT-CHN-0001.webp" }
        ]
    },
    {
        name: "Formal Leather Shoes",
        categoryPath: ["Accessories", "Shoes"],
        variants: [
            { name: "Brown", baseSku: "SHO-DRS-0003", image: "https://i.postimg.cc/cCtCdz8b/SHO-DRS-0003.webp" },
            { name: "Gray", baseSku: "SHO-DRS-0004", image: "https://i.postimg.cc/WtR3z7Gb/SHO-DRS-0004.webp" }
        ]
    },
    {
        name: "Sneakers",
        categoryPath: ["Accessories", "Shoes"],
        variants: [
            { name: "White", baseSku: "SHO-TRN-0001", image: "https://i.postimg.cc/7Zn3vC4T/SHO-TRN-0001.webp" },
            { name: "Brown", baseSku: "SHO-TRN-0002", image: "https://i.postimg.cc/mrd7D0tL/SHO-TRN-0002.webp" }
        ]
    },
    {
        name: "Ankle Socks",
        categoryPath: ["Accessories", "Hats"], // Example, can be adjusted
        variants: [
            { name: "Gray", baseSku: "SOC-ANK-0004", image: "https://i.postimg.cc/Qtw5g1Qv/SOC-ANK-0004.webp" },
            { name: "Black", baseSku: "SOC-ANK-0005", image: "https://i.postimg.cc/sfG5jHyz/SOC-ANK-0005.webp" },
            { name: "Beige", baseSku: "SOC-ANK-0006", image: "https://i.postimg.cc/bNXks0Nt/SOC-ANK-0006.webp" }
        ]
    },
    {
        name: "Regular Socks",
        categoryPath: ["Accessories", "Hats"], // Example, can be adjusted
        variants: [
            { name: "White", baseSku: "SOC-REG-0001", image: "https://i.postimg.cc/nLLQ60T6/SOC-REG-0001.webp" },
            { name: "Black", baseSku: "SOC-REG-0002", image: "https://i.postimg.cc/bvF28kBd/SOC-REG-0002.webp" }
        ]
    }
];

async function findCategoryId(categories: any[], path: string[]): Promise<string | null> {
    let currentCategories = categories;
    let foundCategory = null;

    for (const categoryName of path) {
        foundCategory = currentCategories.find(c => c.name === categoryName);
        if (!foundCategory) return null;
        currentCategories = foundCategory.children || [];
    }

    return foundCategory.id;
}

export default async function seedProductsAndVariants(categories: any[]) {
    for (const product of products) {
        const categoryId = await findCategoryId(categories, product.categoryPath);
        if (!categoryId) {
            console.error(`Category not found for ${product.name}`);
            continue;
        }

        const createdProduct = await prisma.product.create({
            data: {
                name: product.name,
                description: `A high-quality ${product.name.toLowerCase()}, perfect for any occasion.`,
                brand: "FashionPro",
                categoryId: categoryId
            }
        });

        for (const variant of product.variants) {
            for (const size of sizes) {
                await prisma.productVariant.create({
                    data: {
                        productId: createdProduct.id,
                        variant: `${variant.name} - ${size}`,
                        size: size,
                        sku: `${variant.baseSku}-${size}`,
                        price: parseFloat((Math.random() * (150 - 20) + 20).toFixed(2)), // Random price between 20-150
                        inventory: Math.floor(Math.random() * 50), // Random inventory between 0-50
                        image: variant.image
                    }
                });
            }
        }
    }
}
