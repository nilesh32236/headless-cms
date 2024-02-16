// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
    uri: 'http://localhost/headless-cms/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
    ssrMode: 'manual',
});

export default client;