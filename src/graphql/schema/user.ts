export const userSchema = `
	type User {
		id: String!
		email: String!
		login: String!
		name: String!
	}

	type Query {
		currentUser: User
	}
`;
