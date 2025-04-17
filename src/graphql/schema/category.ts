export const categorySchema = `
    type Category {
        id: String!
        name: String!
        image: String
        parentId: String
        parent: Category
        children: [Category!]!
        products: [Product!]!
    }

    type Query {
        categories: [Category!]!
        category(id: String!): Category
    }
`; 