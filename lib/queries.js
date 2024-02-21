// lib/queries.js
import { gql } from "@apollo/client";


export const WORDPRESS_SITE_URL_QUERY = gql`
  query GetWordPressSiteUrl {
    generalSettings {
      url
    }
    registeredStylesheets(first: 100) {
      nodes {
        id
        src
        title
        handle
        after
      }
    }
    registeredScripts(first: 150) {
      nodes {
        src
        handle
        id
        extraData
      }
    }
  }
`;

export const allowedHandlers = ['wp-block-library', 'astra-theme-css', 'astra-theme-js', 'comment-reply'];

export const GET_MENU_ITEMS = gql`
  query GetMenuItems {
    mainMenuItems: menuItems(
      where: {location: PRIMARY}
      first: 20
    ) {
      nodes {
        label
        uri
        id
        parentId
        childItems {
          nodes {
            label
            uri
            parentId
            id
            childItems {
              nodes {
                label
                uri
                parentId
                id
              }
            }
          }
        }
      }
    }
    generalSettings {
      title
    }
  }
`;

export const GET_PAGES_SLUG_QUERY = gql`
  query GetPages {
    pages(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_PAGE_BY_SLUG_QUERY = gql`
  query GetPageBySlug($slug: ID = "") {
    page(id: $slug, idType: URI) {
      title
      content
      slug
    }
  }
`;

export const GET_POSTS = gql`
  query GetPost($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        id
        title(format: RENDERED)
        date
        uri
        excerpt(format: RENDERED)
        author {
          node {
            name
            uri
          }
        }
        categories {
          nodes {
            id
            name
            uri
          }
        }
        featuredImage {
          node {
            mediaDetails {
              sizes {
                sourceUrl
                width
                height
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const GET_ALL_POSTS_ID = gql`
  query GetPost {
    posts(first: 10000) {
      nodes {
        id
        databaseId
      }
    }
  }
`;
export const GET_POST_SLUG_QUERY = gql`
  query GetPostSlug {
    posts(first: 1000) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBYSlug($id: ID = "") {
    post(id: $id, idType: SLUG) {
      content(format: RENDERED)
      title(format: RENDERED)
      date
      author {
        node {
          name
          uri
        }
      }
      categories {
        nodes {
          id
          name
          uri
        }
      }
      featuredImage {
        node {
          mediaDetails {
            sizes {
              sourceUrl
              width
              height
            }
          }
        }
      }
    }
  }
`;
