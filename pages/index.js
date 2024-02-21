import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/component/layout";
import client from "@/lib/apollo-client";
import { GET_ALL_POSTS_ID, GET_POSTS } from "@/lib/queries";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function has_thumbnail(post) {
  return post.featuredImage ? 'has-post-thumbnail' : '';
}
export default function Home({ initialPosts, totalPages, postDatabaseIDs }) {
  const router = useRouter();

  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  console.log(router?.query?.page);
  const after = router?.query?.page > 1 ? btoa(`arrayconnection:${postDatabaseIDs.nodes[postsPerPage * (router?.query?.page - 1)]?.databaseId}`) : null;

  console.log("endCursor: ", posts.pageInfo.endCursor);
  useEffect(() => {
    console.log("after ", after);
    const fetchPosts = async () => {
      const { data } = await client.query({
        query: GET_POSTS,
        variables: { first: postsPerPage, after }
      });
      setPosts(data.posts);
    };

    fetchPosts();
    setCurrentPage(router.query.page || 1);
  }, [router.query.page]);
  return (
    <>
      <div className="ast-row">
        {posts.nodes.map(post => (
          <article key={post.id} className={`post-51 post type-post status-publish format-standard has-post-thumbnail hentry category-6-1 category-block ast-grid-common-col ast-full-width ast-article-post remove-featured-img-padding ${has_thumbnail(post)}`}>
            <div className="ast-post-format- blog-layout-4 ast-article-inner">
              <div className="post-content ast-grid-common-col">
                <div className="ast-blog-featured-section post-thumb ast-blog-single-element">
                  <React.Fragment>
                    {post.featuredImage && (
                      <div className="post-thumb-img-content post-thumb">
                        <Link href={'/post' + post.uri}>
                          <Image src={post.featuredImage.node.mediaDetails.sizes[1].sourceUrl} height={post.featuredImage.node.mediaDetails.sizes[1].height} width={post.featuredImage.node.mediaDetails.sizes[1].width} className="attachment-large size-large wp-post-image" sizes="(max-width: 1024px) 100vw, 1024px" />
                        </Link>
                      </div>
                    )}
                  </React.Fragment>
                  <span className="ast-blog-single-element ast-taxonomy-container cat-links default">
                    {post?.categories?.nodes?.map(category => (
                      <Link href={'/post' + category.uri} key={category.id} rel="category tag">{category.name}</Link>
                    ))}
                  </span>
                  <h2 className="entry-title ast-blog-single-element" itemProp="headline">
                    <Link href={'/post' + post.uri} rel="bookmark">{post.title}</Link>
                  </h2>
                  <header className="entry-header ast-blog-single-element ast-blog-meta-container">
                    <div className="entry-meta">
                      <span className="posted-by vcard author" itemType="https://schema.org/Person" itemScope="itemscope" itemProp="author">
                        <Link title="View all posts by admin" href={'/post' + post?.author?.node?.uri} className="url fn n">
                          <span className="author-name">{post?.author?.node?.name} </span>
                        </Link>
                      </span>
                      <span>/</span>
                      <span className="posted-on">
                        <span className="published">{post.date}</span>
                      </span>
                    </div>
                  </header>
                  <div className="ast-excerpt-container ast-blog-single-element">
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </div>
                  <div className="entry-content clear"></div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={{ pathname: "/", query: { page: i + 1 } }}
          onClick={() => setCurrentPage(i + 1)}
          className={i + 1 === currentPage ? "active" : ""}
        >
          {i + 1}
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const postsPerPage = 10;

  // Fetch all post database IDs
  const { data } = await client.query({
    query: GET_ALL_POSTS_ID,
    variables: { first: 10000 } // Fetching a large number of posts to ensure getting all IDs
  });

  const totalPosts = data.posts.nodes.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // const currentPage = params?.page ? parseInt(params.page, 10) : 1;
  // const after = currentPage > 1 ? btoa(`arrayconnection:${postsPerPage * (currentPage - 1)}`) : null;

  const { data: postData } = await client.query({
    query: GET_POSTS,
    variables: { first: postsPerPage }
  });

  if (!postData.posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { initialPosts: postData.posts, totalPages, postDatabaseIDs: data.posts },
    revalidate: 10,
  };
}
