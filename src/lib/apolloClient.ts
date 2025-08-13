import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({ uri: "https://rata.digitraffic.fi/api/v2/graphql/graphql" }),
    cache: new InMemoryCache()
});

export default client;