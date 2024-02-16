import client from "@/lib/apollo-client";
import { GET_POST_BY_SLUG, GET_POST_SLUG_QUERY } from "@/lib/queries";
import React from "react";

export default function Post({ postData }) {
  return (
    <>
      <article className="post-1 post type-post status-publish format-standard hentry category-uncategorized ast-article-single" id="post-1" itemTypee="https://schema.org/CreativeWork" itemScope="itemscope">
        <div className="ast-post-format- ast-no-thumb single-layout-1">
          <header className="entry-header ">
            <h1 className="entry-title" itemProp="headline">{postData.title}!</h1><div className="entry-meta">By <span className="posted-by vcard author" itemTypee="https://schema.org/Person" itemScope="itemscope" itemProp="author">
              <a title="View all posts by admin" href={postData.author.node.uri} rel="author" className="url fn n" itemProp="url">
                <span className="author-name" itemProp="name">{postData.author.node.name}</span>
              </a>
            </span>
              / <span className="posted-on"><span className="published" itemProp="datePublished"> {postData.date} </span></span></div>
          </header>
          <div className="entry-content clear" ast-blocks-layout="true" itemProp="text">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>
        </div>
      </article>
    </>
  )
}

export async function getStaticPaths() {
  try {
    // Fetch data for all pages
    const { data } = await client.query({ query: GET_POST_SLUG_QUERY });

    const paths = data.posts.nodes.map(post => ({
      params: { postSlug: post.slug }
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error fetching page slugs:", error);
    return { paths: [], fallback: true }; // Return empty paths array in case of error
  }
}

export async function getStaticProps({ params }) {
  try {
    const postSlug = params.postSlug;
    console.log(postSlug);
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { id: postSlug },
    });

    if (!data.post) {
      return {
        notFound: true
      };
    }
    return {
      props: { postData: data.post },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      notFound: true // Return 404 error if there's an error fetching page data
    };
  }
}