import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { gql } from '@apollo/client';

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://api.sandbox.easeflow.io/v1/graphql',
    })
);

const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
});

const TEST_SUBSCRIPTION_QUERY = gql`
  subscription A {
    test {
      type
      count
    }
  }
`;

client
    .subscribe({ query: TEST_SUBSCRIPTION_QUERY })
    .subscribe({
        next({ data }) {
            console.log('Subscription data:', data);
        },
        error(err) {
            console.error('Subscription error:', err);
        },
    });

export default client;