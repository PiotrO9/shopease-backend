export const productSchema = `
    type ProductVariant {
        id: String!
        productId: String!
        image: String
        variant: String
        size: String
        sku: String!
        price: Float
        inventory: Int
        createdAt: String!
        updatedAt: String!
    }

    type Product {
        id: String!
        name: String!
        description: String!
        quantity: Int!
        createdAt: String!
        updatedAt: String!
        variants: [ProductVariant!]!
    }

    type Query {
        randomProducts(count: Int!): [Product]
    }
`;