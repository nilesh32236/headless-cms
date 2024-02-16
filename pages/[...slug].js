// pages/[...slug].js
import client from "./../lib/apollo-client";
import { GET_PAGES_SLUG_QUERY, GET_PAGE_BY_SLUG_QUERY } from "./../lib/queries";

export async function getStaticPaths() {
  try {
    // Fetch data for all pages
    const { data } = await client.query({ query: GET_PAGES_SLUG_QUERY });

    // Create paths based on page slugs
    const paths = data.pages.nodes.map(page => ({
      params: { slug: page.slug.split('/') }
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return { paths: [], fallback: true }; // Return empty paths array in case of error
  }
}

export async function getStaticProps({ params }) {
  try {
    const lastSlug = params.slug[params.slug.length - 1];
    const { data } = await client.query({
      query: GET_PAGE_BY_SLUG_QUERY,
      variables: { slug: lastSlug },
    });

    if ( ! data.page ) {
      return {
        notFound: true
      };
    }
    return {
      props: { pageData: data },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      notFound: true // Return 404 error if there's an error fetching page data
    };
  }
}

export { default } from "./../component/page";


