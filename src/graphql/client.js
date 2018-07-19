import ApolloClient from "apollo-boost";
import {GRAPHQL_PUBLIC_CLIENT} from "../constants/env";

export const pubicClient = new ApolloClient({
    uri: GRAPHQL_PUBLIC_CLIENT
});

export const merchantClient = new ApolloClient({
    uri: GRAPHQL_PUBLIC_CLIENT
});

