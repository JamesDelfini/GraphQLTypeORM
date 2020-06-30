import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { ResolverMap } from "./types/ResolverTypes";
import { User } from "./entity/User";
import { getUserRepository } from "./repository/UserRepository";

const typeDefs = `
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
  }

  type Query {
    hello(name: String): String!
    user(id: Int!): User!
    users: [User!]!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!, email: String!): User!
    updateUser(id: Int!, firstName: String, lastName: String): Boolean
    deleteUser(id: Int!): Boolean
  }
`;

const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: any) => `hhello ${name || "World"}`,
    user: async (_, id: User) => {
      const user = getUserRepository().findById(id);

      return user;
    },
    users: async () => getUserRepository().getAllusers(),
  },
  Mutation: {
    createUser: async (_, userEntity: User) => {
      try {
        const userRepository = getUserRepository();
        const user = await userRepository.createUserAndSave(userEntity);

        return user;
      } catch (err) {
        console.log(err);

        return [];
      }
    },
    updateUser: async (_, userEntity: User) => {
      try {
        const user = await getUserRepository().updateUser(userEntity);

        if (!user.affected) return false;

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
    deleteUser: async (_, userEntity: User) => {
      try {
        const user = await getUserRepository().deleteUser(userEntity);
        
        if (!user.affected) return false;

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }

      return true;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

createConnection().then(() => {
  server.start(() => console.log("Server is running on localhost:4000"));
});
