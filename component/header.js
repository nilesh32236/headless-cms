import { GET_MENU_ITEMS } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";



export default ({ pageSlug }) => {
  const { loading, error, data } = useQuery(GET_MENU_ITEMS);

  if (loading) return <p></p>;
  const mainMenuItems = data.mainMenuItems.nodes;
  const siteTitle = data.generalSettings.title;

  const isCurrentMenu = (uri) => {
    const slug = getSlugFromUri(uri);

    return pageSlug === slug ? 'current-menu-item' : '';
  };

  const isCurrentMenuAncestor = (childrens) => {
    for (let i = 0; i < childrens.nodes.length; i++) {
      const slug = getSlugFromUri(childrens.nodes[i].uri);

      if (pageSlug === slug || hasChildMenuWithSlug(childrens.nodes[i])) {
        return 'current-menu-ancestor';
      }
    }

    return '';
  };

  const hasChildMenu = (children) => {
    return children.nodes.length > 0 ? 'menu-item-has-children' : '';
  };

  const getSlugFromUri = (uri) => {
    const parts = uri.split('/');
    return parts[parts.length - 2];
  };

  const hasChildMenuWithSlug = (node) => {
    if (node.childItems) {
      for (let j = 0; j < node.childItems.nodes.length; j++) {
        const slug = getSlugFromUri(node.childItems.nodes[j].uri);
        if (pageSlug === slug) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <header
      className="site-header header-main-layout-1 ast-primary-menu-enabled ast-logo-title-inline ast-hide-custom-menu-mobile ast-builder-menu-toggle-icon ast-mobile-header-inline"
      id="masthead" itemType="https://schema.org/WPHeader" itemScope="itemscope" itemID="#masthead">
      <div id="ast-desktop-header" data-toggle-type="dropdown">
        <div className="ast-main-header-wrap main-header-bar-wrap ">
          <div className="ast-primary-header-bar ast-primary-header main-header-bar site-header-focus-item"
            data-section="section-primary-header-builder">
            <div className="site-primary-header-wrap ast-builder-grid-row-container site-header-focus-item ast-container"
              data-section="section-primary-header-builder">
              <div className="ast-builder-grid-row ast-builder-grid-row-has-sides ast-builder-grid-row-no-center">
                <div
                  className="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                  <div className="ast-builder-layout-element ast-flex site-header-focus-item"
                    data-section="title_tagline">
                    <div className="site-branding ast-site-identity" itemType="https://schema.org/Organization"
                      itemScope="itemscope">
                      <div className="ast-site-title-wrap">
                        <span className="site-title" itemProp="name">
                          <Link href={'/'}>
                            <h2>{siteTitle}</h2>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                  <div className="ast-builder-menu-1 ast-builder-menu ast-flex ast-builder-menu-1-focus-item ast-builder-layout-element site-header-focus-item"
                    data-section="section-hb-menu-1">
                    <div className="ast-main-header-bar-alignment">
                      <div className="main-header-bar-navigation">
                        <nav className="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item"
                          id="primary-site-navigation-desktop" aria-label="Site Navigation"
                          itemType="https://schema.org/SiteNavigationElement" itemScope="itemscope">
                          <div className="main-navigation ast-inline-flex">
                            <ul id="ast-hf-menu-1" className="main-header-menu ast-menu-shadow ast-nav-menu ast-flex submenu-with-border stack-on-mobile">
                              {mainMenuItems.map((menuItem, index) => (
                                menuItem.parentId === null && (
                                  <li key={index} id="menu-item-7" className={`menu-item menu-item-type-post_type menu-item-object-page ${hasChildMenu(menuItem.childItems)} ${isCurrentMenuAncestor(menuItem.childItems)} ${isCurrentMenu(menuItem.uri)}`}>
                                    <Link href={menuItem.uri} className="menu-link">
                                      {menuItem.label}
                                      {menuItem.childItems.nodes.length > 0 ?
                                        <span role="application" className="dropdown-menu-toggle ast-header-navigation-arrow" tabIndex="0" aria-expanded="false" aria-label="Menu Toggle"><span className="ast-icon icon-arrow"><svg className="ast-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enableBackground="new 57 35.171 26 16.043" xmlSpace="preserve">
                                          <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"></path>
                                        </svg></span></span> : ''}
                                    </Link>
                                    {menuItem.childItems.nodes.length > 0 && (
                                      <ul className="sub-menu">
                                        {menuItem.childItems.nodes.map((subMenuItem, subIndex) => (
                                          <li key={subIndex} className={`menu-item menu-item-type-post_type menu-item-object-page ${hasChildMenu(subMenuItem.childItems)} ${isCurrentMenuAncestor(subMenuItem.childItems)} ${isCurrentMenu(subMenuItem.uri)}`}>
                                            <Link href={subMenuItem.uri} className="menu-link">
                                              {subMenuItem.label}
                                              {subMenuItem.childItems.nodes.length > 0 ?
                                                <span role="application" className="dropdown-menu-toggle ast-header-navigation-arrow" tabIndex="0" aria-expanded="false" aria-label="Menu Toggle"><span className="ast-icon icon-arrow"><svg className="ast-arrow-svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="26px" height="16.043px" viewBox="57 35.171 26 16.043" enableBackground="new 57 35.171 26 16.043" xmlSpace="preserve">
                                                  <path d="M57.5,38.193l12.5,12.5l12.5-12.5l-2.5-2.5l-10,10l-10-10L57.5,38.193z"></path>
                                                </svg></span></span> : ''}
                                            </Link>
                                            {subMenuItem.childItems.nodes.length > 0 && (
                                              <ul className="sub-menu">
                                                {subMenuItem.childItems.nodes.map((subMenuItem2, subIndex2) => (
                                                  <li key={subIndex2} className={`menu-item menu-item-type-post_type menu-item-object-page ${isCurrentMenu(subMenuItem2.uri)}`}>
                                                    <Link href={subMenuItem2.uri} className="menu-link">
                                                      {subMenuItem2.label}
                                                    </Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                )
                              ))}
                            </ul>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};