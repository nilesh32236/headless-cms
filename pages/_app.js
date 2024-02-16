import Layout from "@/component/layout";
import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
// import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { slug } = router.query;
  if (router.isFallback) {
    return null; // Or return <LoadingIndicator /> or any loading component
  }

  return (
    <ApolloProvider client={client}>
      <Layout pageSlug={slug ? slug[slug.length - 1] : ''}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
