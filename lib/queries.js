// lib/queries.js
import { gql } from "@apollo/client";


export const WORDPRESS_SITE_URL_QUERY = gql`
  query GetWordPressSiteUrl {
    generalSettings {
      url
    }
    registeredStylesheets(last: 50) {
      nodes {
        id
        src
        title
        handle
        after
      }
    }
    registeredScripts(last: 150) {
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
    pages {
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
  query GetWordPressSiteUrl {
    posts {
      nodes {
        id
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
            slug
            uri
          }
        }
        excerpt(format: RENDERED)
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
