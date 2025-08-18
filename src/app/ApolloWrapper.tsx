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
            cache: 'no-store'
        },
        // you can override the default `fetchOptions` on a per query basis
        // via the `context` property on the options passed as a second argument
        // to an Apollo Client data fetching hook, e.g.:
        // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { ... }}});
    });

    // use the `ApolloClient` from "@apollo/client-integration-nextjs"
    return new ApolloClient({
        // use the `InMemoryCache` from "@apollo/client-integration-nextjs"
        cache: new InMemoryCache(),
        link: httpLink,
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