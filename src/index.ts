import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request, Response, json } from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { authSchema } from './graphql/schema/auth';
import { userSchema } from './graphql/schema/user';
import { authResolvers } from './graphql/resolvers/auth';
import { userResolvers } from './graphql/resolvers/user';
import { seeder } from './seeder/seeder';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());

const server = new ApolloServer({
  typeDefs: [authSchema, userSchema],
  resolvers: [authResolvers, userResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
	await server.start();

	app.use(json());
	app.use(cookieParser());

	app.use(
		'/graphql',
		expressMiddleware(server, {
		context: async ({ req, res }: { req: Request; res: Response }) => {
			const user = req.cookies['accessToken'] ? { token: req.cookies['accessToken'] } : null;

			return { req, res, user };
		},
		})
	);

	app.post('/seed', async (req: Request, res: Response) => {
		try {
		  await seeder();
		  res.status(200).json({ message: 'Database seeded successfully' });
		} catch (error: any) {
		  console.error('Error seeding database:', error);
		  res.status(500).json({ error: 'Database seeding failed', details: error.message });
		}
	  });

	httpServer.listen(4000, () => {
		console.log('🚀 Server ready at http://localhost:4000/graphql');
	});
}

startServer();
