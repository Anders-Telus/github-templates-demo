const typeDefs = await gql(readFileSync('./src/customers.graphql', { encoding: 'utf-8' }));

module.exports = typeDefs;