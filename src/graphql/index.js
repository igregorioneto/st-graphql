const { join } = require("path");
const {
  loadFilesSync,
  mergeTypeDefs,
  mergeResolvers,
} = require("graphql-tools");

const allTypes = loadFilesSync(
  join(__dirname, "models", "**", "*.schema.gql")
);
const allResolvers = loadFilesSync(
  join(__dirname, "models", "**", "*.resolvers.js")
);

const typeDefs = mergeTypeDefs(allTypes);
const resolvers = mergeResolvers(allResolvers);

module.exports = { typeDefs, resolvers };
