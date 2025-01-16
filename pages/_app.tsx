import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@services/graphql";
import "@styles/global.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = initializeApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
