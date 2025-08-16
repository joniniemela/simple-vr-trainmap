"use client";

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";

// have a function to create a client for you
function makeClient() {
    const httpLink = new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: "https://rata.digitraffic.fi/api/v2/graphql/graphql",
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        fetchOptions: {
            next: { revalidate: 2 }
            // you can pass additional options that should be passed to `fetch` here,
            // e.g. Next.js-related `fetch` options regarding caching and revalidation
            // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'VR-TrainMap/1.0',
        },
    });

    // use the `ApolloClient` from "@apollo/client-integration-nextjs"
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: httpLink,
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
                notifyOnNetworkStatusChange: true,
            },
            query: {
                errorPolicy: 'all',
            },
        },
    });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
      <ApolloNextAppProvider makeClient={makeClient}>
          {children}
      </ApolloNextAppProvider>
    );
}